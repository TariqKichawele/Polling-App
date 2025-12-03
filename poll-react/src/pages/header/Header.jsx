import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate, useLocation } from 'react-router-dom';
import { removeToken, isTokenValid } from '../../utility/common';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Calculate login status - recalculate when location changes (e.g., after login/signup)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isUserLoggedIn = useMemo(() => isTokenValid(), [location]);

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    }
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Polling App
                    </Typography>
                    {isUserLoggedIn ? (
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
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Header