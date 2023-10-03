import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemIcon, SwipeableDrawer } from "@mui/material";
import { FormatItalic, NoteAdd, SwipeUpAlt } from "@mui/icons-material";
import { getAllCompanies } from "../API/DatabaseAPI";
import InfoIcon from "@mui/icons-material/Info";

let prefix = "equity-research-backend-production.up.railway.app";

//localhost
// prefix = "localhost:3500";

export default function NavigationPane({
    height,
    setStateVal,
    handleCompanySelection,
    openDrawer,
    setOpenDrawer,
    setIsAboutPage,
}) {
    let [companies, setCompanies] = useState({
        Airlines: [],
        Package: [],
        RRs: [],
        Trucking: [],
        Manufacturing: [],
        Uber: [],
        UberEats: [],
    });

    useEffect(() => {
        const getCompanies = async () => {
            const fetchResponse = await fetch(
                `https://${prefix}/firebase/getAllCompanies`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const newCompanies = await fetchResponse.json();
            let tempData = {
                Airlines: [],
                Package: [],
                RRs: [],
                Trucking: [],
                Manufacturing: [],
                Uber: [],
                UberEats: [],
            };
            for (const key in newCompanies) {
                const type = newCompanies[key]["data"]["type"];
                tempData[type].push([
                    newCompanies[key]["data"]["name"],
                    newCompanies[key]["id"],
                ]);
            }
            setCompanies(tempData);
        };

        getCompanies();
    }, []);
    return (
        <SwipeableDrawer
            open={openDrawer}
            onClose={() => {
                setOpenDrawer(false);
            }}
            onOpen={() => {
                setOpenDrawer(true);
            }}
        >
            <List
                flex={2}
                sx={{
                    zIndex: "2",
                    minWidth: "200px",
                    width: "200px",
                    bgcolor: "transparent",
                    "& ul": { padding: 0 },
                    maxHeight: `${height}vh`,
                    textAlign: "left",
                    overflow: "scroll",
                }}
            >
                <ListItemButton
                    sx={{ justifyContent: "space-around" }}
                    onClick={() => {
                        setIsAboutPage(true);
                        setOpenDrawer(false);
                    }}
                >
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItem sx={{ textAlign: "left" }}>About</ListItem>
                </ListItemButton>
                <ListItemButton
                    sx={{ justifyContent: "space-around" }}
                    onClick={() => {
                        setIsAboutPage(false);
                        setStateVal({
                            showAddTable: true,
                            selectedCompany: null,
                        });
                        setOpenDrawer(false);
                    }}
                >
                    <ListItemIcon sx={{ justifyContent: "center" }}>
                        <NoteAdd />
                    </ListItemIcon>
                    <ListItem sx={{ textAlign: "left" }}>Add Table</ListItem>
                </ListItemButton>
                {[
                    "Airlines",
                    "Packages",
                    "RRs",
                    "Trucking",
                    "Manufacturing",
                    "Uber",
                ].map((sectionId) => {
                    if (companies[sectionId]) {
                        return (
                            <li key={`section-${sectionId}`}>
                                <ul>
                                    <ListSubheader
                                        sx={{
                                            background: "transparent",
                                            color: "inherit",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        {sectionId}
                                    </ListSubheader>
                                    {companies[sectionId].map((item) => (
                                        <ListItem
                                            key={`item-${sectionId}-${item}`}
                                            sx={{
                                                background: "transparent",
                                            }}
                                        >
                                            <ListItemButton
                                                onClick={() => {
                                                    handleCompanySelection(
                                                        item[1]
                                                    );
                                                    setIsAboutPage(false);
                                                    setOpenDrawer(false);
                                                }}
                                            >
                                                <ListItemText
                                                    primary={item[0]}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        );
                    }
                    return null;
                })}
            </List>
        </SwipeableDrawer>
    );
}
