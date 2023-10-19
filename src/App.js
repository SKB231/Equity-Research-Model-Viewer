import React, { useState, useEffect } from "react";
import { Paper, Stack, Button } from "@mui/material";
import Content from "./Components/Content/Content";
import NavigationPane from "./Components/NavigationPane/NavigationPane";
import Navbar from "./Components/Navbar/Navbar";
import { registerLicense } from "@syncfusion/ej2-base";

let prefix = "equity-research-backend-production.up.railway.app";
// // prefix = "localhost:3500";
//localhost

function App() {
    const [openDrawer, setOpenDrawer] = useState(true);
    const [isAboutPage, setIsAboutPage] = React.useState(false);
    const [reloadRequired, setReloadRequired] = useState(true);

    const [currentContent, setCurrentContent] = useState("ADD_PAGE");

    const [stateVal, setStateVal] = useState({
        showAddTable: true,
        selectedCompany: null,
        selectedCompanyId: "",
    });
    console.log("ID: ");
    console.log(stateVal.selectedCompanyId);
    registerLicense(
        "Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfRF1iSXxQdURhUHxadQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jT35SdkdgWn5ceXFRQw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfcn1SQmU=;MjI3ODcyM0AzMjMxMmUzMDJlMzBpOExRMXhtQnBLelErS1B4RkczMVZmZCtzSkNoVHBhbmtmWmtreWpQOUlrPQ==;MjI3ODcyNEAzMjMxMmUzMDJlMzBZSzV6ajllZTAxSDNlTkJKeXpZSGhhL0tjNkQ1V0Y0eVZZNTRvWjdYWXJrPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkRjW3xdcXdVQGhZ;MjI3ODcyNkAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ==;MjI3ODcyN0AzMjMxMmUzMDJlMzBVZ1lHMTVrK3d6RFFHWUFoN3JRbTBUMStGdkFDMnpDdmJHRVgxS3BIMFlRPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfc3VSR2A=;MjI3ODcyOUAzMjMxMmUzMDJlMzBvR0Y4QTFZeUZuMFhhRnJsaFY5dWlVbE95L2ZQb3FITTlpN1NoUGFnQS9vPQ==;MjI3ODczMEAzMjMxMmUzMDJlMzBvYTlXY2VtalROV01jSkhRcDNtQkp4NVdSWXdLOXBqTkt6a0VrbmR5ZHFRPQ==;MjI3ODczMUAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ=="
    );

    const handleCompanySelection = async (id) => {
        const fetchResp = await fetch(
            `https://${prefix}/firebase/getCompanyFromId/` + id
        );
        const data = await fetchResp.json();
        setStateVal({
            showAddTable: false,
            selectedCompany: data,
            selectedCompanyId: id,
        });
    };
    console.log("SELECTED COMPANY:");
    console.log(stateVal?.selectedCompany);
    // Specifies the navBar height in 'vh' units
    const navBarHeight = 7;
    return (
        <Paper
            sx={{
                overflow: "hidden",
                background: "#010922",
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Stack
                height={"100%"}
                sx={{
                    color: "inherit",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Navbar
                    navBarHeight={navBarHeight}
                    setOpenDrawer={setOpenDrawer}
                    setIsAboutPage={setIsAboutPage}
                    isAboutPage={isAboutPage}
                ></Navbar>
                <Stack
                    direction={"row"}
                    spacing={0.05}
                    display={"flex"}
                    justifyContent="center"
                >
                    <NavigationPane
                        height={100 - navBarHeight}
                        setStateVal={setStateVal}
                        handleCompanySelection={handleCompanySelection}
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                        reloadRequired={reloadRequired}
                        setReloadRequired={setReloadRequired}
                        setCurrentContent={setCurrentContent}
                    />
                    <Content
                        height={100 - navBarHeight}
                        selectedCompany={stateVal.selectedCompany}
                        companyId={stateVal.selectedCompanyId}
                        setCurrentContent={setCurrentContent}
                        currentContent={currentContent}
                        setReloadRequired={setReloadRequired}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default App;
