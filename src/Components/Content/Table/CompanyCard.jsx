import React, { useRef, useEffect } from "react";
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
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    SpreadsheetComponent,
    SheetsDirective,
    RangeDirective,
    RangesDirective,
    SheetDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import { Workbook } from "@syncfusion/ej2-react-spreadsheet";
import { isLocked } from "@syncfusion/ej2-react-spreadsheet";
import { Box } from "@mui/material";
import OutlinedCard from "./StockCard";
import { getAllCellsWithColor } from "./Utility/tableProcessor";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CompanyCard({ companyName, jsonFile, ticker }) {
    const [expanded, setExpanded] = React.useState(false);
    const spreadsheetRef = useRef(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const protectUnmarkedCells = async (data) => {
        const spreadsheet = spreadsheetRef.current;
        spreadsheet.protectSheet(0, { selectCells: true, formatCells: false });
        if (data && data["sheets"]) {
            const markedCells = getAllCellsWithColor(
                data["sheets"][0],
                "#FBE5D6"
            );
            console.log(markedCells);
            for (const idx in markedCells) {
                const [row, cell] = markedCells[idx];
                spreadsheet["sheets"][0]["rows"][row]["cells"][
                    cell
                ].isLocked = false;
            }
        }
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
