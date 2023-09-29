import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";

export default function WebcastLink({ webcastLink }) {
    return (
        <Box sx={{ margin: "1rem", background: "transparent", color: "white" }}>
            <h2>
                <a href={webcastLink}>Most Recent Webcast</a>
            </h2>
        </Box>
    );
}
