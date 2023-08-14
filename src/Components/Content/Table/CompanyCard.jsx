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

export default function CompanyCard({ companyName, jsonFile, ticker }) {
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
        const chartData = data.response.map((element) => {
            return {
                x: new Date(element.date * 1000),
                y: [element.open, element.high, element.low, element.close],
            };
        });
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
        if (companyStockInfoResponseData) {
            const { name, response } = companyStockInfoResponseData;
            const {
                earningsDate,
                eps,
                fiftyTwoWeekRange,
                forwardDividend,
                forwardYield,
                marketCap,
                peRatio,
            } = response;

            const mapData = {
                earningsDate,
                eps,
                fiftyTwoWeekRange,
                forwardDividend,
                forwardYield,
                marketCap,
                peRatio,
            };
            setStockSummaryInfo(Object.entries(mapData));
            setYahooCompanyName(name);
        }
    };

    const updateStockValues = async () => {
        const { previousClose, regularMarketPrice } =
            await getCompanyCurrentStock({ symbol: ticker });
        setStockInfo({ previousClose, current: regularMarketPrice });
    };
    console.log(stockSummaryInformation);
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
                        <StockCard ticker={ticker} stockInfo={stockInfo} />
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
                <h3>SUMMARY</h3>
                {stockChartData.series && stockChartData.series.length > 0 && (
                    <Chart
                        options={stockChartData.options}
                        series={stockChartData.series}
                        type="candlestick"
                        width="80%"
                    />
                )}
            </Box>
            <StockSummaryInformation
                stockSummaryInformation={stockSummaryInformation}
            ></StockSummaryInformation>
            <Box sx={{ margin: "2rem" }}>
                <h4>KEY COMMENTS</h4>
                <SimpleMDE />
            </Box>
        </Card>
    );
}
