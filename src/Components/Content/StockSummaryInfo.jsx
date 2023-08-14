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
    const rows = [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
    ];
    console.log(stockSummaryInformation);
    if (!stockSummaryInformation || stockSummaryInformation.length <= 0) {
        return <></>;
    }

    return (
        <TableContainer
            component={Box}
            sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                margin: "1rem",
            }}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Summary Key</TableCell>
                        <TableCell align="right">Summary Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stockSummaryInformation &&
                        stockSummaryInformation.length > 0 &&
                        stockSummaryInformation.map((element) => {
                            if (typeof element[1] == "object") {
                                let values = Object.values(element[1]);
                                if (element[0] == "earningsDate") {
                                    values = values.map((dateString) => {
                                        return new Date(
                                            dateString * 1000
                                        ).toLocaleDateString();
                                    });
                                }
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {element[0]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {values[0] + " - " + values[1]}
                                        </TableCell>
                                    </TableRow>
                                );
                            } else {
                                return (
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {element[0]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {element[1]}
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// import { Box } from "@mui/material";

// export default function StockSummaryInformation({ stockSummaryInformation }) {
//     return (

//     );
// }

{
    /* <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <ul sx={{ width: "80%", background: "red" }}>
                {stockSummaryInformation &&
                    stockSummaryInformation.length > 0 &&
                    stockSummaryInformation.map((element) => {
                        if (typeof element[1] == "object") {
                            let values = Object.values(element[1]);
                            if (element[0] == "earningsDate") {
                                values = values.map((dateString) => {
                                    return new Date(
                                        dateString * 1000
                                    ).toLocaleDateString();
                                });
                            }
                            return (
                                <li>
                                    <span>{element[0]}</span>{" "}
                                    <span>{values[0] + " - " + values[1]}</span>
                                </li>
                            );
                        }
                        return (
                            <li>
                                <span>{element[0]}</span>{" "}
                                <span>{element[1]}</span>
                            </li>
                        );
                    })}
            </ul>
        </Box> */
}
