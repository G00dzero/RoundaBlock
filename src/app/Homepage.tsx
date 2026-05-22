import { Button, Container, Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { CalendarMonth, Groups, Poll, Brightness4, Brightness7 } from '@mui/icons-material';
import VideoBackground from './components/VideoBackground';
import FloatingIcons from './components/FloatingIcons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type HomepageProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Homepage({ darkMode, setDarkMode }: HomepageProps) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const features = [
    {
      icon: <CalendarMonth sx={{ fontSize: 56, color: '#FF6B9D' }} />,
      title: 'Find the Perfect Time',
      description: 'No more endless back-and-forth! We help you discover when everyone is free.'
    },
    {
      icon: <Groups sx={{ fontSize: 56, color: '#FFA500' }} />,
      title: 'Invite Your Crew',
      description: 'Whether it\'s your besties, family, or work squad - bring everyone together effortlessly.'
    },
    {
      icon: <Poll sx={{ fontSize: 56, color: '#9B59B6' }} />,
      title: 'Vote & Decide',
      description: 'Pizza or tacos? Beach or mountains? Let everyone have a say and pick what works best.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [darkMode]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: darkMode ? '#1a1a1a' : '#FFF9F5', transition: 'background-color 0.3s ease' }}>
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          bgcolor: darkMode ? '#333' : 'white',
          color: darkMode ? '#fff' : '#333',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            bgcolor: darkMode ? '#444' : '#f5f5f5',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.5s ease'
        }}
      >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <Box
        sx={{
          position: 'relative',
          width: { xs: '100vw', md: 'auto' },
          minHeight: { xs: '100vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          px: { xs: 0, sm: 3 },
          pt: { xs: 0, md: 0 },
          pb: { xs: 0, md: 0 },
          textAlign: 'center',
          overflow: 'hidden',
          borderRadius: { xs: 0, md: '0 0 50px 50px' }
        }}
      >
        <VideoBackground />
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 2, width: '100%', px: { xs: 2, sm: 3 }, maxWidth: { md: '960px' } }}>
          <Typography className="reveal" variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '3rem', sm: '2.4rem', md: '3.2rem' } }}>
            RoundaBlock
          </Typography>
          <Typography className="reveal" variant="h5" sx={{ mb: 2, opacity: 0.95, lineHeight: 1.35, fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.15rem' } }}>
            Planning with Friends Should Be Fun!
          </Typography>
          <Typography className="reveal" variant="h6" sx={{ mb: 5, opacity: 0.9, lineHeight: 1.45, fontSize: { xs: '0.85rem', sm: '0.98rem' } }}>
            Stop the group chat chaos. Start making memories together.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signin')}
              sx={{
                bgcolor: '#FF6B9D',
                color: 'white',
                '&:hover': { bgcolor: '#FF5588', transform: 'scale(1.05)' },
                px: { xs: 3, sm: 5 },
                py: { xs: 1.4, sm: 1.8 },
                borderRadius: '50px',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              Let's Plan Something!
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{
                borderColor: 'white',
                borderWidth: 2,
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderWidth: 2
                },
                px: { xs: 3, sm: 5 },
                py: { xs: 1.4, sm: 1.8 },
                borderRadius: '50px',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                width: { xs: '100%', sm: 'auto' }
              }}
            >
              See How It Works
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ position: 'relative', py: 12, overflow: 'hidden' }}>
        <FloatingIcons />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography id="features" className="reveal" variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 2, color: darkMode ? 'white' : 'inherit' }}>
            How We Make Planning Easy
          </Typography>
          <Typography className="reveal" variant="h6" align="center" sx={{ color: darkMode ? '#aaa' : '#666', mb: 8, px: 2 }}>
            No stress, no confusion - just good times ahead
          </Typography>

          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            {features.map((feature, index) => (
              <Card
                className="reveal"
                key={index}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 0' },
                  maxWidth: { xs: '100%', sm: '350px' },
                  width: { xs: '100%', sm: 'auto' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: { xs: 3, sm: 4 },
                  borderRadius: '24px',
                  border: 'none',
                  bgcolor: darkMode ? '#2a2a2a' : 'white',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                  boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: { sm: 'translateY(-12px)' },
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2, color: darkMode ? 'white' : 'inherit', fontSize: { xs: '1rem', sm: '1.05rem' } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#666', lineHeight: 1.6, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(131, 50, 125, 0.98) 0%, rgba(65, 106, 172, 0.98) 100%)'
            : 'linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)',
          py: 10,
          borderRadius: '50px 50px 0 0',
          mx: 2
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, color: 'white', mb: 2, fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3rem' } }}>
              Your Next Adventure Awaits!
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', mb: 5, opacity: 0.95, px: 2, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
              Join friends everywhere who are already making plans happen
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                bgcolor: 'white',
                color: '#FF6B9D',
                '&:hover': { bgcolor: '#f5f5f5', transform: 'scale(1.05)' },
                px: { xs: 3, md: 6 },
                py: { xs: 1.4, md: 2 },
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              Start Planning for Free
            </Button>
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: darkMode ? 'rgba(226, 232, 240, 0.8)' : 'rgba(255, 255, 255, 0.92)',
                fontSize: '0.85rem',
                letterSpacing: '0.02em'
              }}
            >
              © {year} RoundaBlock. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>

      
    </Box>
  );
}