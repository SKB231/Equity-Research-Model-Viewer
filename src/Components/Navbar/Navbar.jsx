import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AdbIcon } from "@mui/icons-material";
import { margin } from "@mui/system";
import { School } from "@mui/icons-material";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
const settings = ["Login"];
// TODO: Implement login functionality
const userName = "Guest";

function Navbar({ navBarHeight, setOpenDrawer, setIsAboutPage, isAboutPage }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const title = "EQUITY RESEARCH";
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenPage = (buttonName) => {
        if (buttonName == "About") {
            setIsAboutPage(true);
        } else {
            setIsAboutPage(false);
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    background: "black",
                    boxShadow: "none",
                    height: "60px",
                    // height: `${navBarHeight}vh`,
                }}
            >
                <Container
                    maxWidth="100%"
                    sx={{ margin: "None", justifyContent: "space-between" }}
                >
                    <Toolbar sx={{ width: "100", display: 'flex', justifyContent: 'center'} }>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "80%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    sx={{ color: "inherit" }}
                                    onClick={() => setOpenDrawer(true)}
                                >
                                    <DensitySmallIcon />
                                </Button>
                                <School
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        mr: 1,
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        width: '100%',
                                        mr: 2,
                                        display: 'flex',
                                        fontFamily: "Roboto",
                                        fontWeight: 700,
                                        letterSpacing: ".05rem",
                                        color: "inherit",
                                        textDecoration: "none",
                                        boxShadow: "none",
                                        textAlign: 'center'
                                    }}
                                >
                                    {title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 0,
                                    margin: 0,
                                    maxHeight: `${navBarHeight}vh`,
                                }}
                            >
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Guest"
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        key={"Start"}
                                        disabled={true}
                                        textAlign="center"
                                    >
                                        {userName}
                                    </MenuItem>
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseUserMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default Navbar;
