import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
    Backdrop, 
    Box, 
    CircularProgress, 
    Container, 
    CssBaseline, 
    Grid, 
    Link, 
    Typography, 
    Avatar, 
    TextField, 
    Button,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../../../services/auth/auth';
import { saveToken } from '../../../utility/common';
import { useSnackbar } from 'notistack';

const defaultTheme = createTheme();

const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(formData);
            if (response.status === 200) {
                const responseData = response.data;
                saveToken(responseData.jwtToken);
                enqueueSnackbar(responseData.message || 'Login successful', { variant: 'success', autoHideDuration: 3000 });
                navigate('/dashboard');
            }
        } catch (error) {
            if(error.response && error.response.status === 401) {
                const errorMessage = error.response.data?.message || "Invalid credentials";
                enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
            } else {
                const errorMessage = error.response?.data?.message || "Something went wrong";
                enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
            }
        } finally {
            setLoading(false);
        }   
    }

    return (
    <>
        <ThemeProvider theme={defaultTheme}>
            <Container>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            sx={{ mt: 3, mb: 2 }} 
                            disabled={!formData.email || !formData.password}
                        >
                            {loading ? <CircularProgress color='success' size={24} /> : 'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link variant="body2" onClick={() => navigate('/signup')}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Backdrop 
            open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="success" />
        </Backdrop>
    </>
  )
}

export default Login