import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Box } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
export default function StockSummaryInfo({ stockSummaryInformation }) {
    if (!stockSummaryInformation || stockSummaryInformation.length <= 0) {
        return <></>;
    }

    console.log(stockSummaryInformation);
    return (
        <TableContainer
            component={Box}
            sx={{
                fontSize: "1.5rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
                color: "white",
            }}
        >
            <Box>
                <Table aria-label="simple table" sx={{ color: "white" }}>
                    <TableHead>
                        <TableRow sx={{ color: "inherit" }}>
                            <TableCell
                                sx={{ color: "inherit", background: "black" }}
                            >
                                Summary Key
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ color: "inherit", background: "black" }}
                            >
                                Summary Value
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockSummaryInformation &&
                            stockSummaryInformation.length > 0 &&
                            stockSummaryInformation.map((element, index) => {
                                const bColor =
                                    index % 2 == 0
                                        ? "rgba(1, 9, 34, 0.1)"
                                        : "rgba(20, 20, 10, 0.8)";
                                return (
                                    <TableRow
                                        sx={{
                                            color: "inherit",
                                            background: `${bColor}`,
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{ color: "inherit" }}
                                        >
                                            {element[0]}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ color: "inherit" }}
                                        >
                                            {element[1]}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </Box>
        </TableContainer>
    );
}
