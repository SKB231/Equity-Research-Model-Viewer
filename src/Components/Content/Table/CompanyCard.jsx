import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { Box } from "@mui/material";
import { getAllCellsWithColor } from "./Utility/tableProcessor";
import StockCard from "../StockCard";
import { getCompanyCurrentStock } from "../../API/StockDataAPI";

export default function CompanyCard({ companyName, jsonFile, ticker }) {
    const spreadsheetRef = useRef(null);
    const [StockInfo, setStockInfo] = useState({
        updated: "",
        previousClose: "",
        open: "",
    });

    const protectUnmarkedCells = async (data) => {
        const spreadsheet = spreadsheetRef.current;
        spreadsheet.protectSheet(0, { selectCells: true, formatCells: false });
        if (data && data["sheets"]) {
            const markedCells = getAllCellsWithColor(
                data["sheets"][0],
                "#FBE5D6"
            );
            for (const idx in markedCells) {
                const [row, cell] = markedCells[idx];
                spreadsheet["sheets"][0]["rows"][row]["cells"][
                    cell
                ].isLocked = false;
            }
        }
    };

    const updateStockValues = async () => {
        const responseJson = await getCompanyCurrentStock({ symbol: ticker });
        console.log(responseJson);
    };

    useEffect(() => {
        let spreadsheet = spreadsheetRef.current;
        if (jsonFile && spreadsheet) {
            let jsonObj = JSON.parse(jsonFile);
            if (!jsonObj) {
                return;
            }
            spreadsheet.openFromJson({ file: jsonObj });
            console.log(spreadsheet);
            protectUnmarkedCells(spreadsheet);
        }

        updateStockValues();
    }, [companyName, jsonFile, ticker]);

    return (
        <Card
            sx={{
                background: "transparent",
                margin: "0.05rem",
                height: "100%",
                overflow: "scroll",
            }}
        >
            <Box
                sx={{
                    margin: "1rem",
                }}
            >
                <h1>
                    <h1>{companyName}</h1>
                </h1>
                <h2>
                    <h4 sx={{ color: grey }}>{ticker}</h4>
                </h2>
            </Box>
            <Box
                sx={{
                    margin: "1rem",
                }}
            >
                <StockCard />
            </Box>
            <div style={{ height: "100vh", margin: "2rem" }}>
                <SpreadsheetComponent
                    ref={spreadsheetRef}
                    openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                    saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                ></SpreadsheetComponent>
            </div>
        </Card>
    );
}
