import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
    Box, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, useLocation } from 'react-router-dom';
import { removeToken, isTokenValid } from '../../utility/common';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // Calculate login status - recalculate when location changes (e.g., after login/signup)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isUserLoggedIn = useMemo(() => isTokenValid(), [location]);

    const handleLogout = () => {
        removeToken();
        setMobileOpen(false);
        navigate('/login');
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    const handleNavigation = (path) => {
        navigate(path);
        setMobileOpen(false);
    }

    const loggedInMenuItems = [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Create Poll', path: '/poll/create' },
        { text: 'My Polls', path: '/my-polls' },
    ];

    const loggedOutMenuItems = [
        { text: 'Login', path: '/login' },
        { text: 'Signup', path: '/signup' },
    ];

    const drawer = (
        <Box sx={{ width: 250, height: '100%', bgcolor: 'primary.main' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                    Menu
                </Typography>
                <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
            <List>
                {isUserLoggedIn ? (
                    <>
                        {loggedInMenuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton 
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{ 
                                        color: 'white',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton 
                                onClick={handleLogout}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    loggedOutMenuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton 
                                onClick={() => handleNavigation(item.path)}
                                sx={{ 
                                    color: 'white',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                                flexGrow: 1,
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(isUserLoggedIn ? '/dashboard' : '/login')}
                        >
                            Polling App
                        </Typography>
                        {!isMobile && (
                            isUserLoggedIn ? (
                                <>
                                    <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                                    <Button color="inherit" component={Link} to="/poll/create">Create Poll</Button>
                                    <Button color="inherit" component={Link} to="/my-polls">My Polls</Button>
                                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                </>
                            )
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: 250,
                        bgcolor: 'primary.main'
                    },
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}

export default Header
