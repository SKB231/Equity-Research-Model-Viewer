import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { createCompany } from "../../API/DatabaseAPI";
import SimpleMDE from "react-simplemde-editor";
import { InputLabel, FormControl, Stack } from "@mui/material";
import { Button, TextField, Box } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { getCompanyCurrentStock } from "../../API/StockDataAPI";
import TableInput from "./TableInput";

export default function AddTable({
    editPage,
    jsonFile,
    name,
    ticker,
    type,
    recentWebcast,
    companyInformation,
    keyComments,
    linkToSlide,
    table,
    setCurrentContent,
    setReloadRequired,
}) {
    const spreadsheetRef = useRef(null);
    const [formValues, setFormValues] = useState({
        companyName: "",
        category: "",
        ticker: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [file, setFile] = useState(null);
    const [fileJson, setFileJson] = useState("");
    const [updatingStockVal, setUpdatingStockVal] = useState(false);
    const [stockSymbolValid, setStockSymbolValid] = useState(true);
    const [tickerHasData, setTickerHasData] = useState(false);
    const [tab, setTable] = useState([["", ""]]);

    // On Open Complete
    const openComplete = async () => {
        let spreadsheet = spreadsheetRef.current;
        if (spreadsheet && spreadsheet.sheets) {
            try {
                let response = await spreadsheetRef.current.saveAsJson();
                if (response) {
                    let workbook = response["jsonObject"];
                    await protectAllCells(workbook);
                    setFileJson(workbook);
                }
            } catch (e) {
                alert(
                    "There was an error uploading the file. Please try uploading again!"
                );
            }
        }
    };

    const protectAllCells = async (data) => {
        const spreadsheet = spreadsheetRef.current;
        spreadsheet.protectSheet(0, { selectCells: true, formatCells: false });
    };

    // Use Effect called when form values change.
    useEffect(() => {
        for (const val in formValues) {
            if (!formValues[val] || !formValues[val].length > 0) {
                setIsDisabled(true);
                return;
            }
        }
        if (!fileJson || fileJson.length == 0) {
            setIsDisabled(true);
            return;
        }

        setIsDisabled(false);
    }, [formValues, fileJson]);

    // Use Effect called when file is uploaded.
    useEffect(() => {
        const fetchDataAsync = async () => {
            if (file) {
                let spreadsheet = spreadsheetRef.current;
                if (spreadsheet) {
                    spreadsheet.open({ file });
                }
            }
        };
        fetchDataAsync();
    }, [file]);
    const handleKeyComments = async (event) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            keyComments: event,
        }));
    };
    // Function to handled change in formValues
    const handleChange = async (event) => {
        const { name, value } = event.target;

        if (name === "ticker") {
            if (value !== "" && value.length !== 0) {
                setTickerHasData(true);
            } else {
                setTickerHasData(false);
            }
            setUpdatingStockVal(true);
            getCompanyCurrentStock({
                symbol: value,
            }).then((data) => {
                if (data != 1) {
                    setStockSymbolValid(true);
                } else {
                    setStockSymbolValid(false);
                }
                setUpdatingStockVal(false);
            });
        }
        // New form values = (Prev_Form_Values) <Union> (New Form Values)
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (editPage) {
            if (ticker == "") {
                console.log("No Ticker given. Heading back to view state.");
                setCurrentContent("VIEW_PAGE");
            }
            setCompany();
        }
    }, []);
    // Function to handle change in file.
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setFile(file);
    };

    const setCompany = () => {
        console.log("type is ", type);
        const newFormValues = {
            companyName: name,
            ticker: ticker,
            category: type,
            recentWebcast: recentWebcast,
            companyInformation: companyInformation,
            keyComments: keyComments,
            linkToSlide: linkToSlide,
        };
        setTable(JSON.parse(table));
        const spreadsheet = spreadsheetRef.current;
        const jsonObj = JSON.parse(jsonFile);
        if (jsonObj && spreadsheet) {
            if (!jsonObj) {
                return;
            }
            spreadsheet.openFromJson({ file: jsonObj });
        }
        setFormValues(newFormValues);
    };

    const getCompany = async () => {
        const stringJson = await JSON.stringify(fileJson);
        const stringTableJson = await JSON.stringify(tab);
        return {
            jsonFile: stringJson,
            name: formValues.companyName,
            ticker: formValues.ticker,
            type: formValues.category,
            recentWebcast: formValues.recentWebcast,
            companyInformation: formValues.companyInformation,
            keyComments: formValues.keyComments,
            linkToSlide: formValues.linkToSlide,
            table: stringTableJson,
        };
    };
    // Function to submit the form and call the API.
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stockSymbolValid) {
            const finalStr = `Stock symbol ${formValues.ticker}, may not be valid for ${formValues.companyName}. Please delete the page if this is the case since the symbol is mapped to the final page.`;
            alert(finalStr);
        }

        const newCompany = await getCompany();
        const resp = await createCompany(newCompany);
        if (resp == 0) {
            setReloadRequired(true);
            window.location.reload();
        } else {
            alert(
                "Some error occured while submitting the information. Please try submitting again!"
            );
        }
    };
    return (
        <Card
            sx={{
                background: "white",
                margin: "0.05rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box sx={{ margin: "1rem", width: "85%", minWidth: "600px" }}>
                <Box>
                    <h1>
                        <h1>
                            {!editPage ? "Add new Company" : "Edit company"}
                        </h1>
                    </h1>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack
                        direction={"column"}
                        spacing={2}
                        alignItems={"center"}
                    >
                        <TextField
                            name="companyName"
                            label="Company Name"
                            variant="outlined"
                            sx={{
                                width: "100%",
                            }}
                            value={formValues.companyName}
                            onChange={handleChange}
                            required
                        />
                        <Stack width="100%" direction={"row"}>
                            <FormControl
                                required
                                sx={{
                                    width: "50%",
                                    marginRight: "1rem",
                                    color: "inherit",
                                }}
                            >
                                <InputLabel id="option-label">
                                    Select Company Type
                                </InputLabel>
                                <Select
                                    label="Select Company Type"
                                    name="category"
                                    labelId="option-label"
                                    placeholder="Company Type"
                                    onChange={handleChange}
                                    sx={{ color: "inherit" }}
                                    value={formValues.category}
                                >
                                    <MenuItem value="Airlines">
                                        Airlines
                                    </MenuItem>
                                    <MenuItem value="Package">Package</MenuItem>
                                    <MenuItem value="RRs">RRs</MenuItem>
                                    <MenuItem value="Trucking">
                                        Trucking
                                    </MenuItem>
                                    <MenuItem value="Manufacturing">
                                        Manufacturing
                                    </MenuItem>
                                    <MenuItem value="Manufacturing">
                                        Uber
                                    </MenuItem>
                                    <MenuItem value="Transport">
                                        Transport
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="ticker"
                                sx={{ width: "50%" }}
                                label="Enter Company Ticker"
                                required
                                onChange={handleChange}
                                error={!stockSymbolValid}
                                color={
                                    updatingStockVal
                                        ? "warning"
                                        : stockSymbolValid && tickerHasData
                                        ? "success"
                                        : "primary"
                                }
                                value={formValues.ticker}
                            ></TextField>
                        </Stack>
                        <TextField
                            name="companyInformation"
                            sx={{ width: "100%" }}
                            label="Information about the company"
                            onChange={handleChange}
                            multiline
                            minRows={2}
                            value={formValues.companyInformation}
                        ></TextField>
                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                onChange={handleFileChange}
                                name="filePath"
                                type="file"
                                hidden
                            />
                        </Button>
                        <Box sx={{ fontStyle: "italic" }}>
                            Click the button to upload your DCF model. Make sure
                            to have the editable cells in this color:
                            <Typography
                                sx={{
                                    background: "#FBE5D6",
                                    textAlign: "center",
                                }}
                            >
                                #FBE5D6
                            </Typography>
                        </Box>
                        <Box
                            style={{
                                height: "100vh",
                                margin: "2rem",
                                width: "100%",
                            }}
                        >
                            <SpreadsheetComponent
                                openComplete={openComplete}
                                ref={spreadsheetRef}
                                openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                                saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                            ></SpreadsheetComponent>
                        </Box>
                        <TableInput setTable={setTable} tab={tab}></TableInput>
                        <Box sx={{ width: "100%" }}>
                            <h1>Additional Overview Info:</h1>
                        </Box>{" "}
                        <Box
                            sx={{
                                width: "100%",
                                marginTop: "2rem",
                                fontStyle: "italic",
                            }}
                        >
                            Here, you could provide a link to the website that
                            displays the latest webcast of the company's
                            Investor Overview presentation.
                        </Box>{" "}
                        <TextField
                            name="recentWebcast"
                            sx={{ width: "100%" }}
                            label="Most Recent Webcast"
                            onChange={handleChange}
                            value={formValues.recentWebcast}
                        ></TextField>
                        <Box
                            sx={{
                                width: "100%",
                                marginTop: "2rem",
                                fontStyle: "italic",
                            }}
                        >
                            In order to display the Presentation PDF, we'll need
                            to get the CDN URL of the investor overview. Delta
                            for example:
                            'https://s2.q4cdn.com/181345880/files/doc_presentations/2023/02/1Q-2023-Delta-Standing-Presentation_vF_.pdf'
                        </Box>{" "}
                        <TextField
                            name="linkToSlide"
                            sx={{ width: "100%" }}
                            label="Investor Overview PDF link"
                            onChange={handleChange}
                            value={formValues.linkToSlide}
                        ></TextField>
                        <Box
                            sx={{
                                width: "100%",
                                marginTop: "2rem",
                                fontStyle: "italic",
                            }}
                        >
                            Lastly, you could add notable observations or
                            insights you may have based on last investor
                            overview.
                        </Box>{" "}
                        <Box sx={{ margin: "2rem", width: "100%" }}>
                            <h4>KEY COMMENTS</h4>
                            <SimpleMDE
                                value={formValues.keyComments}
                                onChange={handleKeyComments}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{
                                maxWidth: "50%",
                            }}
                            //disabled={isDisabled}
                            onSubmit={handleSubmit}
                        >
                            Add Table
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Card>
    );
}
