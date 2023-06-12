import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import { getAllCompanies } from "../API/DatabaseAPI";

export default function NavigationPane({
    height,
    setStateVal,
    handleCompanySelection,
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
                "http://localhost:3500/firebase/getAllCompanies",
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
        <List
            flex={2}
            sx={{
                zIndex: "2",
                width: "20%",
                minWidth: "200px",
                bgcolor: "background.paper",
                "& ul": { padding: 0 },
                maxHeight: `${height}vh`,
                textAlign: "left",
                overflow: "scroll",
                paddingTop: "0px",
                paddingBottom: "0px",
            }}
        >
            <ListItemButton
                sx={{ justifyContent: "space-around" }}
                onClick={() =>
                    setStateVal({ showAddTable: true, selectedCompany: null })
                }
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
                                <ListSubheader>{sectionId}</ListSubheader>
                                {companies[sectionId].map((item) => (
                                    <ListItem key={`item-${sectionId}-${item}`}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleCompanySelection(item[1]);
                                            }}
                                        >
                                            <ListItemText primary={item[0]} />
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
    );
}
