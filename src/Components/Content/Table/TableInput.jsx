import React, { useState } from "react";
import {
    TextField,
    InputLabel,
    Input,
    FormControl,
    FormHelperText,
    Stack,
    Paper,
    Box,
    Button,
} from "@mui/material";
export default function TableInput({ tab, setTable }) {
    const incrimentTable = () => {
        if (tab.length >= 20) {
            return;
        }
        setTable((prevTable) => {
            return [...prevTable, ["", ""]];
        });
    };

    const decrementTable = () => {
        setTable((prevTable) => {
            if (prevTable.length <= 0) {
                return prevTable;
            }
            prevTable.pop();
            return [...prevTable];
        });
    };
    return (
        <Box sx={{ width: "100%" }}>
            <h1>Current Stock Price Information:</h1>
            <Box fontStyle="italic">
                Summary Information: Here you could add stock price information
                using Yahoo Finance such as EPS, 52 Week Range, Forward
                Dividend, etc.
            </Box>
            <Button
                onClick={incrimentTable}
                variant="outlined"
                sx={{ margin: "1rem" }}
            >
                +
            </Button>
            <Button
                onClick={decrementTable}
                variant="outlined"
                sx={{ margin: "1rem" }}
            >
                -
            </Button>
            {tab &&
                tab.map((row, index) => {
                    return (
                        <Box sx={{ borderBottom: "10px", width: "50%" }}>
                            <TextField
                                required={true}
                                sx={{ margin: "0.3rem" }}
                                placeholder="Key"
                                onChange={(event) => {
                                    setTable((prevTable) => {
                                        prevTable[index][0] =
                                            event.target.value;
                                        return [...prevTable];
                                    });
                                }}
                            >
                                {row[0]}
                            </TextField>

                            <TextField
                                required={true}
                                sx={{ margin: "0.3rem" }}
                                placeholder="Value"
                                onChange={(event) => {
                                    setTable((prevTable) => {
                                        prevTable[index][1] =
                                            event.target.value;
                                        return [...prevTable];
                                    });
                                }}
                            >
                                {row[1]}
                            </TextField>
                            <hr sx={{ innerWidth: "50%" }} />
                        </Box>
                    );
                })}
        </Box>
    );
}
