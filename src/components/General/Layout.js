import { AppBar, Divider, Drawer, Fab, Fade, List, ListItem, ListItemButton, ListItemIcon, Slide, Toolbar, Tooltip, Typography, useScrollTrigger } from '@mui/material';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ToastContainer } from 'react-toastify';

const drawerWidth = 100;

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

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveTab(0);
        } else if (location.pathname === "/kategori") {
            setActiveTab(1);
        } else if (location.pathname === "/urun") {
            setActiveTab(2);
        } else if (location.pathname === "/kullanici") {
            setActiveTab(3);
        } else if (location.pathname === "/profil") {
            setActiveTab(9);
        }
    }, [location])

    useEffect(() => { }, [location]);

    return (
        location.pathname === "/giris" ? (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: "url(https://i.hizliresim.com/tsb11yf.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
            }}>
                <Outlet />
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: "#f5f5f5",
                height: "100vh",
            }}>
                <Outlet />
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
        ) : (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: `${drawerWidth}px`,
                backgroundColor: "#f5f5f5",
                height: "100vh",
            }} >
                <Container maxWidth={false} sx={{
                    width: '95%',
                    display: 'flex',
                    flexDirection: 'column',
                }} >
                    <HideOnScroll {...props}>
                        <AppBar position='fixed' sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, height: "88px", backgroundColor: "#FFFFFF", padding: "12px" }}>
                            <Toolbar sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Typography variant="h6" color={"#5d5d5d"} sx={{
                                    fontWeight: 600,
                                    ":hover": {
                                        cursor: "pointer",
                                        color: "#1890ff",
                                    },
                                    fontFamily: "'Poppins', sans-serif",
                                }} noWrap component="div" onClick={() => {
                                    navigate("/");
                                }}>
                                    Bilgi İşlem Daire Başkanlığı Stok Takip Uygulaması
                                </Typography>
                                <Tooltip title="Profil" placement="bottom">
                                    <AccountCircleIcon sx={{
                                        fontSize: "35px",
                                        color: activeTab === 9 ? "#1890ff" : "#5d5d5d",
                                        ":hover": {
                                            cursor: "pointer",
                                            color: "#1890ff",
                                        }
                                    }} onClick={(e) => {
                                        setActiveTab(9);
                                        navigate("/profil", { replace: true });
                                    }} />
                                </Tooltip>
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
                            onClick={() => {
                                navigate("/");
                            }}
                        />
                        <Divider />
                        <List>
                            <ListItem >
                                <ListItemButton onClick={() => {
                                    setActiveTab(0);
                                    navigate("/", { replace: true });
                                }}>
                                    <Tooltip title="Anasayfa" placement="right">
                                        <ListItemIcon>
                                            <HomeIcon sx={{
                                                fontSize: "27px",
                                                color: activeTab === 0 ? "#1890ff" : "#5d5d5d",
                                                ":hover": {
                                                    cursor: "pointer",
                                                    color: "#1890ff",
                                                }
                                            }} />
                                        </ListItemIcon>
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                            <ListItem >
                                <ListItemButton onClick={() => {
                                    setActiveTab(1);
                                    navigate("/kategori", { replace: true });
                                }}>
                                    <Tooltip title="Kategoriler" placement="right">
                                        <ListItemIcon>
                                            <CategoryIcon sx={{
                                                fontSize: "27px",
                                                color: activeTab === 1 ? "#1890ff" : "#5d5d5d",
                                                ":hover": {
                                                    cursor: "pointer",
                                                    color: "#1890ff",
                                                }
                                            }} />
                                        </ListItemIcon>
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                            <ListItem >
                                <ListItemButton onClick={() => {
                                    setActiveTab(2);
                                    navigate("/urun", { replace: true });
                                }}>
                                    <Tooltip title="Ürünler" placement="right">
                                        <ListItemIcon>
                                            <InventoryIcon sx={{
                                                fontSize: "27px",
                                                color: activeTab === 2 ? "#1890ff" : "#5d5d5d",
                                                ":hover": {
                                                    cursor: "pointer",
                                                    color: "#1890ff",
                                                }
                                            }} />
                                        </ListItemIcon>
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                            <ListItem >
                                <ListItemButton onClick={() => {
                                    setActiveTab(3);
                                    navigate("/kullanici", { replace: true });
                                }}>
                                    <Tooltip title="Kullanıcılar" placement="right">
                                        <ListItemIcon>
                                            <GroupIcon sx={{
                                                fontSize: "27px",
                                                color: activeTab === 3 ? "#1890ff" : "#5d5d5d",
                                                ":hover": {
                                                    cursor: "pointer",
                                                    color: "#1890ff",
                                                }
                                            }} />
                                        </ListItemIcon>
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <List>
                                <ListItem >
                                    <ListItemButton onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("authentication");
                                        navigate("/", { replace: true });
                                    }}>
                                        <Tooltip title="Çıkış Yap" placement="right">
                                            <ListItemIcon>
                                                <ExitToAppIcon sx={{
                                                    fontSize: "27px",
                                                }} color='error' />
                                            </ListItemIcon>
                                        </Tooltip>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            mt: 10,
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