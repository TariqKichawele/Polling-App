import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { postPoll } from '../../../services/poll/poll';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Container, 
  CssBaseline, 
  Box, 
  Typography, 
  Avatar, 
  Backdrop, 
  CircularProgress, 
  Button, 
  TextField, 
  Autocomplete, 
  Chip, 
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const defaultTheme = createTheme();

const CreatePoll = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: [],
    expiredAt: null,
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const obj = {
        question: formData.question,
        options: formData.options,
        expiredAt: formData.expiredAt,
      }
      const response = await postPoll(obj);
      if (response.status === 201) {
        const responseData = response.data;
        enqueueSnackbar(responseData.message || 'Poll created successfully', { variant: 'success', autoHideDuration: 3000 });
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data?.message || 'Unauthorized';
        enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
      } else {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 3000 });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
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
              <HowToVoteIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Poll
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                multiline
                rows={2}
                sx={{ width: '100%' }}
                margin="normal"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                fullWidth
                id="outlined-multiline-static"
                label="Enter Question"
                name="question"
                autoFocus
              />
              <Autocomplete 
                multiple
                sx={{ width: '100%' }}
                options={[]}
                freeSolo
                value={formData.options}
                onChange={(event, newValue ) => setFormData({ ...formData, options: newValue })}
                renderTags={( value, getTagProps) => 
                  value.map((option, index) => (
                    <Chip key={index} {...getTagProps({ index })} label={option} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Enter Options" margin="normal" name="options" />
                )}
              />
              <DateTimePicker 
                sx={{ mt: 3, width: '100%' }}
                label="Expired At"
                value={formData.expiredAt}
                onChange={(date) => setFormData({ ...formData, expiredAt: date })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formData.question || !formData.options || !formData.expiredAt}
              >
                {loading ? <CircularProgress color='success' size={24} /> : 'Create Poll'}
              </Button>
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

export default CreatePoll