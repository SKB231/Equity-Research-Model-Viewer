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
import {
    InputLabel,
    Input,
    FormControl,
    FormHelperText,
    Stack,
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
import data from "../test";
import { getAllCellsWithColor } from "./Utility/tableProcessor";

export default function AddTable() {
    const [spreadsheetJSON, setSpreadsheetJSON] = useState("");
    const spreadsheetNextRef = useRef(null);

    const spreadsheetRef = useRef(null);
    const [formValues, setFormValues] = useState({
        companyName: "",
        companyInformation: "",
        category: "",
    });
    const [file, setFile] = useState(null);

    const openComplete = async () => {
        let spreadsheet = spreadsheetRef.current;
        if (spreadsheet && spreadsheet.sheets) {
            let sheet = spreadsheet.sheets[0];
            const protectSettings = { selectCells: true, formatCells: false };
            spreadsheet.protectSheet(0, protectSettings);

            let jsonObjResp = (await spreadsheet.saveAsJson())["jsonObject"];
            const strVersion = await JSON.stringify(jsonObjResp);
        }
    };

    useEffect(() => {
        const spreadsheet = spreadsheetRef.current;
        spreadsheet.openFromJson({ file: data });
        spreadsheet.protectSheet(0, { selectCells: true, formatCells: false });
        if (data && data["Workbook"] && data["Workbook"]["sheets"]) {
            const markedCells = getAllCellsWithColor(
                data["Workbook"]["sheets"][0],
                "#FBE5D6"
            );
            console.log(markedCells)
            
            for (const idx in markedCells) {
                const [row, cell] = markedCells[idx];
                spreadsheet["sheets"][0]["rows"][row]["cells"][cell].isLocked = false
            }
        }
    }, []);

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

    const handleChange = async (event) => {
        const { name, value } = event.target;
        // New form values = (Prev_Form_Values) <Union> (New Form Values)
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await spreadsheetRef.current.saveAsJson();
        let responseJSON = await JSON.stringify(response);
        console.log(formValues);
        console.log(responseJSON);
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
                subheader="September 14, 2016"
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
                        <FormControl required sx={{ width: "100%" }}>
                            <InputLabel id="option-label">
                                Select an option
                            </InputLabel>
                            <Select
                                name="category"
                                labelId="option-label"
                                onChange={handleChange}
                            >
                                <MenuItem value="Airlines">Airlines</MenuItem>
                                <MenuItem value="Package">Package</MenuItem>
                                <MenuItem value="RRs">RRs</MenuItem>
                                <MenuItem value="Trucking">Trucking</MenuItem>
                                <MenuItem value="Manufacturing">
                                    Manufacturing
                                </MenuItem>
                                <MenuItem value="Transport">Transport</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            name="companyInformation"
                            label="Company Information"
                            variant="outlined"
                            value={formValues.companyInformation}
                            onChange={handleChange}
                            multiline
                            sx={{
                                width: "100%",
                            }}
                            rows={4}
                        />
                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                onChange={handleFileChange}
                                name="filePath"
                                type="file"
                                hidden
                            />
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                maxWidth: "50%",
                            }}
                        >
                            Add Table
                        </Button>
                    </Stack>
                </form>
                <div style={{ height: "100vh", margin: "2rem" }}>
                    <SpreadsheetComponent
                        openComplete={openComplete}
                        ref={spreadsheetRef}
                        openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                        saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                    ></SpreadsheetComponent>
                </div>
            </CardContent>
        </Card>
    );
}
