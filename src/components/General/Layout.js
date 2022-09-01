import { AppBar, Card, Divider, Drawer, Fab, Fade, List, ListItem, ListItemButton, ListItemIcon, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import InventoryIcon from '@mui/icons-material/Inventory';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer } from 'react-toastify';

const drawerWidth = 73;

function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function ScrollTop(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,

    window: PropTypes.func,
};

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function Layout(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = React.useState();

    document.body.style = "background-color: #f5f5f5;";

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab(0);
        } else if (location.pathname === "/kategori") {
            setActiveTab(1);
        } else if (location.pathname === "/urun") {
            setActiveTab(2);
        } else if (location.pathname === "/kullanici") {
            setActiveTab(3);
        }
    }, [])

    return (
        location.pathname === "/giris" ? (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                backgroundColor: '#f5f5f5',
            }}>
                <Card sx={{
                    display: 'flex',
                    justifyItems: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    width: '50vw',
                    background: "rgba(0,0,0,0)",
                    textAlign: 'center',
                    padding: '1rem',
                    border: '1px solid #000',
                    boxShadow: '0px 0px 10px #000',
                }} >
                    <Outlet />
                </Card>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </Box>
        ) : location.pathname === "/sifremi-unuttum" ? (
            <>
                <Outlet />
            </>
        ) : (
            <Box >
                <Container fixed>
                    <HideOnScroll {...props}>
                        <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: "#FFFFFF" }}>
                            <Toolbar>
                                <Typography variant="h6" color={"#5d5d5d"} sx={{
                                    fontWeight: 600,
                                    ":hover": {
                                        cursor: "pointer",
                                        color: "#1890ff",
                                    }
                                }} noWrap component="div">
                                    Stok Takip
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </HideOnScroll>
                    <Toolbar id="back-to-top-anchor" />
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="permanent"
                        anchor='left'
                    >
                        <img
                            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Erciyes_University_logo.svg/1200px-Erciyes_University_logo.svg.png`}
                            alt="Erciyes Üniversitesi"
                            style={{
                                width: "90%",
                                height: "auto",
                                padding: "0.6rem",
                                marginLeft: "0.2rem",
                            }}
                        />
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setActiveTab(0);
                                    navigate("/", { replace: true });
                                }}>
                                    <ListItemIcon>
                                        <HomeIcon sx={{
                                            color: activeTab === 0 ? "#1890ff" : "#5d5d5d",
                                            ":hover": {
                                                cursor: "pointer",
                                                color: "#1890ff",
                                            }
                                        }} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setActiveTab(1);
                                    navigate("/kategori", { replace: true });
                                }}>
                                    <ListItemIcon>
                                        <CategoryIcon sx={{
                                            color: activeTab === 1 ? "#1890ff" : "#5d5d5d",
                                            ":hover": {
                                                cursor: "pointer",
                                                color: "#1890ff",
                                            }
                                        }} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setActiveTab(2);
                                    navigate("/urun", { replace: true });
                                }}>
                                    <ListItemIcon>
                                        <InventoryIcon sx={{
                                            color: activeTab === 2 ? "#1890ff" : "#5d5d5d",
                                            ":hover": {
                                                cursor: "pointer",
                                                color: "#1890ff",
                                            }
                                        }} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setActiveTab(3);
                                    navigate("/kullanici", { replace: true });
                                }}>
                                    <ListItemIcon>
                                        <GroupIcon sx={{
                                            color: activeTab === 3 ? "#1890ff" : "#5d5d5d",
                                            ":hover": {
                                                cursor: "pointer",
                                                color: "#1890ff",
                                            }
                                        }} />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("authentication");
                                        navigate("/", { replace: true });
                                    }}>
                                        <ListItemIcon>
                                            <ExitToAppIcon color='error' />
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            p: 3,
                            display: 'flex',
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <Outlet />
                    </Box>
                </Container>
                <ScrollTop {...props}>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover />
            </Box>
        )



    )
}

export default Layout