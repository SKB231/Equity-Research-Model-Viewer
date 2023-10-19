import { Paper } from "@mui/material";
import CompanyCard from "./Table/CompanyCard";
import AddTable from "./Table/AddTable";
import { useState } from "react";
import About from "./About";
const Content = ({
    height,
    selectedCompany,
    companyId,
    setCurrentContent,
    currentContent,
    setReloadRequired,
}) => {
    return (
        <div
            flex={10}
            sx={{
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
            {currentContent === "ABOUT" && <About />}
            {currentContent === "ADD_PAGE" && (
                <AddTable
                    editPage={false}
                    setReloadRequired={setReloadRequired}
                />
            )}
            {currentContent === "EDIT_PAGE" && (
                <AddTable
                    editPage={true}
                    setCurrentContent={setCurrentContent}
                    ticker={selectedCompany?.ticker}
                    name={selectedCompany?.name}
                    jsonFile={selectedCompany?.jsonFile}
                    companyInformation={selectedCompany?.companyInformation}
                    displayWebcast={selectedCompany?.displayWebcast}
                    recentWebcast={selectedCompany?.recentWebcast}
                    keyComments={selectedCompany?.keyComments}
                    linkToSlide={selectedCompany?.linkToSlide}
                    type={selectedCompany?.type}
                    table={selectedCompany?.table}
                    setReloadRequired={setReloadRequired}
                />
            )}
            {currentContent === "VIEW_PAGE" && (
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
                    table={selectedCompany?.table}
                    setCurrentContent={setCurrentContent}
                />
            )}
        </div>
    );
};

export default Content;
