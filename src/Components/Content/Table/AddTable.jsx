import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createCompany } from "../../API/DatabaseAPI";
import {
    InputLabel,
    Input,
    FormControl,
    FormHelperText,
    Stack,
    Paper,
} from "@mui/material";
import { Button, TextField } from "@mui/material";
import { MenuItem, Select } from "@mui/material";
import {
    SpreadsheetComponent,
    SheetsDirective,
    RangeDirective,
    RangesDirective,
    SheetDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import { Workbook } from "@syncfusion/ej2-react-spreadsheet";
import { isLocked } from "@syncfusion/ej2-react-spreadsheet";
import data from "./test";
import { getAllCellsWithColor } from "./Utility/tableProcessor";

export default function AddTable() {
    const spreadsheetRef = useRef(null);
    const [formValues, setFormValues] = useState({
        companyName: "",
        category: "",
        ticker: "",
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [file, setFile] = useState(null);
    const [fileJson, setFileJson] = useState("");
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

    // Use Effect called on Mount
    useEffect(() => {
        // const spreadsheet = spreadsheetRef.current;
        // spreadsheet.openFromJson({ file: data });
    }, []);

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

    // Function to handled change in formValues
    const handleChange = async (event) => {
        const { name, value } = event.target;
        // New form values = (Prev_Form_Values) <Union> (New Form Values)
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Function to handle change in file.
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setFile(file);
    };

    const getCompany = async () => {
        const stringJson = await JSON.stringify(fileJson);
        return {
            jsonFile: stringJson,
            name: formValues.companyName,
            ticker: formValues.ticker,
            type: formValues.category,
        };
    };

    // Function to submit the form and call the API.
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCompany = await getCompany();
        const resp = await createCompany(newCompany);
        console.log(resp);
        if (resp == 0) {
            alert("Successfully added company!");
        } else {
            alert(
                "Some error occured while submitting the information. Please try submitting again!"
            );
        }
    };

    return (
        <Card
            sx={{
                margin: "0.05rem",
                height: "100%",
                overflow: "scroll",
            }}
        >
            <CardHeader
                title="Add New Company"
                subheader="This is the page to add the company name, ticker, type, and the DCF Excel File. All fields must be filled to be to upload."
            />
            <CardContent>
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
                                sx={{ width: "50%", marginRight: "1rem" }}
                            >
                                <InputLabel
                                    id="option-label"
                                    sx={{ bgcolor: "white" }}
                                >
                                    Select Company Type
                                </InputLabel>
                                <Select
                                    name="category"
                                    labelId="option-label"
                                    placeholder="Company Type"
                                    onChange={handleChange}
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
                            ></TextField>
                        </Stack>

                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                onChange={handleFileChange}
                                name="filePath"
                                type="file"
                                hidden
                            />
                        </Button>
                        <div style={{ height: "100vh", margin: "2rem" }}>
                            <SpreadsheetComponent
                                openComplete={openComplete}
                                ref={spreadsheetRef}
                                openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                                saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                            ></SpreadsheetComponent>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            sx={{
                                maxWidth: "50%",
                            }}
                            disabled={isDisabled}
                            onSubmit={handleSubmit}
                        >
                            Add Table
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}
