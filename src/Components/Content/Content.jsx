import { Paper } from "@mui/material";
import CompanyCard from "./Table/CompanyCard";
import AddTable from "./Table/AddTable";
import { useState } from "react";
import About from "./About";
const Content = ({
    height,
    selectedAddTable,
    selectedCompany,
    companyId,
    isAboutPage,
}) => {
    console.log(companyId)
    return (
        <div
            flex={10}
            sx={{
                // overflow: "hidden",
                maxHeight: `${height}vh`,
                minHeight: `${height}vh`,
                width: "100%",
                background: "transparent",
                color: "white",
                overflow: "scroll",
                display: "flex",
                justifyContent: "center",
            }}
        >
            {isAboutPage && <About />}
            {!isAboutPage && selectedAddTable && <AddTable />}
            {!isAboutPage && !selectedAddTable && (
                <CompanyCard
                    companyId={companyId}
                    companyName={selectedCompany?.name}
                    ticker={selectedCompany?.ticker}
                    jsonFile={selectedCompany?.jsonFile}
                    companyInformation={selectedCompany?.companyInformation}
                    displayWebcast={selectedCompany?.displayWebcast}
                    recentWebcast={selectedCompany?.recentWebcast}
                    keyComments={selectedCompany?.keyComments}
                    linkToSlide={selectedCompany?.linkToSlide}
                    table={selectedCompany.table}
                />
            )}
        </div>
    );
};

export default Content;
