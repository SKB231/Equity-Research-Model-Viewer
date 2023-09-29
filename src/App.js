import React, { useState, useEffect } from "react";
import { Paper, Stack, Button } from "@mui/material";
import Content from "./Components/Content/Content";
import NavigationPane from "./Components/NavigationPane/NavigationPane";
import Navbar from "./Components/Navbar/Navbar";
import { registerLicense } from "@syncfusion/ej2-base";

function App() {
    const [selectedAddTable, setSelectedAddTable] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(true);

    const [stateVal, setStateVal] = useState({
        showAddTable: true,
        selectedCompany: null,
    });

    registerLicense(
        "Mgo+DSMBaFt+QHJqVk1hXk5Hd0BLVGpAblJ3T2ZQdVt5ZDU7a15RRnVfRF1iSXxQdURhUHxadQ==;Mgo+DSMBPh8sVXJ1S0R+X1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jT35SdkdgWn5ceXFRQw==;ORg4AjUWIQA/Gnt2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfcn1SQmU=;MjI3ODcyM0AzMjMxMmUzMDJlMzBpOExRMXhtQnBLelErS1B4RkczMVZmZCtzSkNoVHBhbmtmWmtreWpQOUlrPQ==;MjI3ODcyNEAzMjMxMmUzMDJlMzBZSzV6ajllZTAxSDNlTkJKeXpZSGhhL0tjNkQ1V0Y0eVZZNTRvWjdYWXJrPQ==;NRAiBiAaIQQuGjN/V0d+Xk9HfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkRjW3xdcXdVQGhZ;MjI3ODcyNkAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ==;MjI3ODcyN0AzMjMxMmUzMDJlMzBVZ1lHMTVrK3d6RFFHWUFoN3JRbTBUMStGdkFDMnpDdmJHRVgxS3BIMFlRPQ==;Mgo+DSMBMAY9C3t2VFhiQlJPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSXhTd0VhWnxfc3VSR2A=;MjI3ODcyOUAzMjMxMmUzMDJlMzBvR0Y4QTFZeUZuMFhhRnJsaFY5dWlVbE95L2ZQb3FITTlpN1NoUGFnQS9vPQ==;MjI3ODczMEAzMjMxMmUzMDJlMzBvYTlXY2VtalROV01jSkhRcDNtQkp4NVdSWXdLOXBqTkt6a0VrbmR5ZHFRPQ==;MjI3ODczMUAzMjMxMmUzMDJlMzBEaEwyQnY3RUQwQWg4bTByZWUvVEt6eWkyZ1haem9pcC9zbmRCbWxIa2xjPQ=="
    );

    const handleCompanySelection = async (id) => {
        const fetchResp = await fetch(
            "http://localhost:3500/firebase/getCompanyFromId/" + id
        );
        const data = await fetchResp.json();
        setStateVal({
            showAddTable: false,
            selectedCompany: data,
        });
    };
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
                    />
                    <Content
                        height={100 - navBarHeight}
                        selectedAddTable={stateVal.showAddTable}
                        selectedCompany={stateVal.selectedCompany}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
}

export default App;
