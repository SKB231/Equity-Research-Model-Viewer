import React, { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { Box } from "@mui/material";
import { getAllCellsWithColor } from "./Utility/tableProcessor";
import StockCard from "../StockCard";
import {
    getCompanyCurrentStock,
    getCompanyStock,
    getCompanyStockInfo,
} from "../../API/StockDataAPI";

import Chart from "react-apexcharts";
import StockSummaryInformation from "../StockSummaryInfo";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import WebcastLink from "../WebcastLink";
import Markdown from "react-markdown";
import SlideViewer from "./SlideViewer/SlideViewer";

export default function CompanyCard({
    companyName,
    jsonFile,
    ticker,
    recentWebcast,
    companyInformation,
    keyComments,
    linkToSlide,
    table,
}) {
    const spreadsheetRef = useRef(null);
    const [stockInfo, setStockInfo] = useState({
        previousClose: 0,
        current: 0,
    });

    const [stockChartData, setStockChartData] = useState({
        series: [
            {
                name: "candle",
                data: [],
            },
        ],
        options: {
            dataLabels: {
                style: {
                    colors: ["#F44336", "#E91E63", "#9C27B0"],
                },
            },

            chart: {
                type: "candlestick",
                height: 350,
            },
            title: {
                text: "CandleStick Chart",
                align: "left",
            },
            xaxis: {
                type: "datetime",
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                },
            },
        },
    });
    const [stockSummaryInformation, setStockSummaryInfo] = useState({});
    const [yahooCompanyName, setYahooCompanyName] = useState(companyName);
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

    const updateStockChartValues = async () => {
        const todayDate = new Date().toLocaleDateString();
        const startDate = new Date(
            new Date() - 90 * 24 * 60 * 60 * 1000
        ).toLocaleDateString();
        const bodyObj = {
            startDate: startDate,
            endDate: todayDate,
            symbol: ticker,
            frequency: "1d",
        };
        const data = await getCompanyStock(bodyObj);

        /**
         * Element from:
         * "date": 1691692200,
            "open": 44.6,
            "high": 44.69,
            "low": 44.1,
            "close": 44.17,
            "adjClose": 44.17,
            "volume": 5485300
         *   to
            {
                x: (date*1000),
                y: [open, high,low, close]
            }
         */
        let chartData = [];

        if (data && data.response && data.response.length > 0) {
            chartData = data.response.map((element) => {
                return {
                    x: new Date(element.date * 1000),
                    y: [element.open, element.high, element.low, element.close],
                };
            });
        }

        setStockChartData({
            series: [
                {
                    name: "candle",
                    data: chartData,
                },
            ],
            options: {
                chart: {
                    type: "candlestick",
                    height: 350,
                },
                title: {
                    text: `${yahooCompanyName} Stock`,
                    align: "left",
                },
                xaxis: {
                    type: "datetime",
                },
                yaxis: {
                    tooltip: {
                        enabled: true,
                    },
                },
            },
        });
        const companyStockInfoResponseData = await getCompanyStockInfo({
            symbol: ticker,
        });
    };

    const updateStockValues = async () => {
        const { previousClose, regularMarketPrice } =
            await getCompanyCurrentStock({ symbol: ticker });
        setStockInfo({ previousClose, current: regularMarketPrice });
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
        updateStockChartValues();
    }, [companyName, jsonFile, ticker]);

    return (
        <Card
            sx={{
                background: "transparent",
                margin: "1rem",
                height: "100%",
                color: "inherit",
                minWidth: "600px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "75%",
                    margin: "1rem",
                }}
            >
                <Box
                    sx={{
                        margin: "1rem",
                        width: "100%",
                    }}
                >
                    <h1>
                        <h1>{yahooCompanyName}</h1>
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
                    <h3>PROFILE</h3>
                    {stockInfo &&
                        stockInfo.previousClose != 0 &&
                        stockInfo.previousClose != undefined && (
                            <StockCard
                                ticker={ticker}
                                stockInfo={stockInfo}
                                companyInformation={companyInformation}
                            />
                        )}
                </Box>

                <div style={{ height: "100vh", margin: "2rem" }}>
                    <SpreadsheetComponent
                        ref={spreadsheetRef}
                        openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
                        saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
                    ></SpreadsheetComponent>
                </div>

                <Box
                    sx={{
                        margin: "1rem",
                        width: "100%",
                    }}
                >
                    <h1>SUMMARY</h1>
                    {stockChartData.series &&
                        stockChartData.series.length > 0 && (
                            <>
                                <Chart
                                    options={stockChartData.options}
                                    series={stockChartData.series}
                                    type="candlestick"
                                    width="100%"
                                />
                                <h4>Chart Data from Yahoo Finance</h4>
                            </>
                        )}
                </Box>
                {table && (
                    <StockSummaryInformation
                        stockSummaryInformation={JSON.parse(table)}
                    ></StockSummaryInformation>
                )}

                <WebcastLink webcastLink={recentWebcast}></WebcastLink>
                <SlideViewer pdfLink={linkToSlide} />
                <Box
                    sx={{
                        margin: "2rem",
                        background: "rgba(0.4,0.1,0.1,0.4)",
                        padding: "1rem",
                    }}
                >
                    <Box>
                        <h2>KEY COMMENTS</h2>
                    </Box>
                    <Markdown>{keyComments}</Markdown>
                </Box>
            </Box>
        </Card>
    );
}
