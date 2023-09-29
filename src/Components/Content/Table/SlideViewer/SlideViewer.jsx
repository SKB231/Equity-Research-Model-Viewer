import React from "react";
import { Box } from "@mui/material";
export default function SlideViewer({ quarterNum = 1, pdfLink }) {
    const title = `Investor Overview Presentation: `;
    return (
        <Box sx={{ margin: "2rem", width: "100%" }}>
            <h1 sx={{ margin: "2rem" }}>{title}</h1>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "1rem",
                }}
            >
                <iframe
                    title="slide"
                    src={pdfLink}
                    width="100%"
                    height="800px"
                ></iframe>
            </Box>
        </Box>
    );
}
