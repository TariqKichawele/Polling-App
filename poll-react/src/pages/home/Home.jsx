import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GroupsIcon from '@mui/icons-material/Groups';
import TimerIcon from '@mui/icons-material/Timer';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import CreateIcon from '@mui/icons-material/Create';
import { isTokenValid } from '../../utility/common';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isLoggedIn = useMemo(() => isTokenValid(), [location]);

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Easy Poll Creation',
      description: 'Create polls in seconds with a simple and intuitive interface. Add as many options as you need.',
    },
    {
      icon: <TimerIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Timed Polls',
      description: 'Set expiration dates on your polls to collect responses within a specific time frame.',
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Real-Time Results',
      description: 'Watch votes come in live with visual progress bars and percentage breakdowns.',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Community Driven',
      description: 'Browse and vote on polls created by the community. Engage with others and share opinions.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Secure Voting',
      description: 'One vote per user per poll ensures fair and accurate results every time.',
    },
    {
      icon: <HowToVoteIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Manage Your Polls',
      description: 'View, track, and manage all the polls you\'ve created from your personal dashboard.',
    },
  ];

  const steps = [
    { number: '1', title: 'Sign Up', description: 'Create a free account in just a few seconds.' },
    { number: '2', title: 'Create a Poll', description: 'Write your question, add options, and set an expiry.' },
    { number: '3', title: 'Share & Collect Votes', description: 'Let the community vote and watch results in real time.' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <PollIcon sx={{ fontSize: { xs: 60, md: 80 }, mb: 2, opacity: 0.9 }} />
          <Typography
            variant={isMobile ? 'h4' : 'h2'}
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Make Decisions Together
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}
          >
            Create polls, gather opinions, and make informed decisions. 
            The easiest way to collect votes and see what everyone thinks.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/poll/create')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Create a Poll
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  Get Started — It's Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    '&:hover': { borderColor: 'grey.300', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Log In
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="text.primary"
          >
            How It Works
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}
          >
            Getting started is quick and easy — just three simple steps.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {steps.map((step) => (
              <Grid size={{ xs: 12, sm: 4 }} key={step.number}>
                <Box textAlign="center">
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            color="text.primary"
          >
            Everything You Need
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}
          >
            Powerful features to make polling simple, fast, and effective.
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 3,
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            fontWeight="bold"
            gutterBottom
          >
            Ready to Start Polling?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Join the community and start making better decisions together. It only takes a minute.
          </Typography>
          {isLoggedIn ? (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/poll/create')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                px: 5,
                py: 1.5,
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Create Your First Poll
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 'bold',
                px: 5,
                py: 1.5,
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Sign Up for Free
            </Button>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, px: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Polling App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;

