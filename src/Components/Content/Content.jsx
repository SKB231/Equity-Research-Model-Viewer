import { Paper } from "@mui/material";
import CompanyCard from "../Table/CompanyCard";
import AddTable from "../Table/AddTable";
import { useState } from "react";

const Content = ({ height }) => {
    const [selectedAddTable, setSelectedAddTable] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("DAL");

    return (
        <Paper
            bgcolor={"grey"}
            flex={10}
            sx={{
                overflow: "hidden",
                maxHeight: `${height}vh`,
                width: "100%",
            }}
        >
            <AddTable />
        </Paper>
    );
};

export default Content;
