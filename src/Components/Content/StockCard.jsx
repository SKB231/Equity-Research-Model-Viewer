import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";

export default function StockCard({ ticker, stockInfo }) {
    return (
        <Box
            sx={{
                width: "100%",
                margin: "1rem",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    minWidth: 300,
                    margin: "rem",
                    background: "#1876c2",
                }}
            >
                <CardActionArea>
                    <CardContent sx={{ color: "white" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            $ {stockInfo.current}
                        </Typography>
                        <Typography variant="body2" color="white">
                            {" "}
                            {Math.round(
                                (stockInfo.current - stockInfo.previousClose) *
                                    100
                            ) / 100}{" "}
                            ${stockInfo.previousClose} Previous Close
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Typography sx={{ margin: "1rem" }}>
                One of the world's oldest airlines in operation, Delta is
                headquartered in Atlanta, Georgia. The airline, along with its
                subsidiaries and regional affiliates, including Delta
                Connection, operates over 5,400 flights daily and serves 325
                destinations in 52 countries on six continents.{" "}
            </Typography>
        </Box>
    );
}
