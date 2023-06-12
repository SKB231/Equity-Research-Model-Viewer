import { Paper } from "@mui/material";
import CompanyCard from "./Table/CompanyCard";
import AddTable from "./Table/AddTable";
import { useState } from "react";

const Content = ({ height, selectedAddTable, selectedCompany }) => {
    console.log(selectedCompany);
    return (
        <Paper
            bgcolor={"grey"}
            flex={10}
            sx={{
                overflow: "hidden",
                maxHeight: `${height}vh`,
                minHeight: `${height}vh`,
                width: "100%",
            }}
        >
            {selectedAddTable && <AddTable />}
            {!selectedAddTable && (
                <CompanyCard
                    companyName={selectedCompany?.name}
                    ticker={selectedCompany?.ticker}
                    jsonFile={selectedCompany?.jsonFile}
                />
            )}
        </Paper>
    );
};

export default Content;
