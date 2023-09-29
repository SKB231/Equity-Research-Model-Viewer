import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";

export default function StockCard({ ticker, stockInfo, companyInformation }) {
    return (
        <Box
            sx={{
                width: "100%",
                margin: "1rem",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                color: "inherit",
            }}
        >
            <Card
                sx={{
                    minWidth: 200,
                    margin: "2rem",
                    background:
                        "linear-gradient(135deg, #9CA0FE 0%, #130139 100%)",
                }}
            >
                <CardActionArea>
                    <CardContent
                        sx={{
                            color: "white",
                            justifyContent: "center",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            $ {stockInfo.current}
                        </Typography>
                        <Typography>Previous Close</Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            <Typography color="white">
                                {" "}
                                {Math.round(
                                    (stockInfo.current -
                                        stockInfo.previousClose) *
                                        100
                                ) / 100}{" "}
                            </Typography>
                            <Typography>${stockInfo.previousClose}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Typography sx={{ margin: "1rem" }}>
                {companyInformation}
            </Typography>
        </Box>
    );
}
