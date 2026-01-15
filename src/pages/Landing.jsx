import React, { useState } from 'react';
import { 
  Box, Container, Typography, Button, Grid, Paper, Stack,
  Chip, Avatar, ThemeProvider, createTheme, CssBaseline, 
  alpha, TextField, InputAdornment 
} from '@mui/material';
import { 
  Telegram, Bolt, Hub, Terminal, 
  Fingerprint, ArrowForward, Analytics, Security
} from '@mui/icons-material';

// --- CONFIGURATION ---
const LANDING_PAGE_URL = "https://attendance-09.vercel.app";
const DASHBOARD_BASE_URL = "https://attendance-09.vercel.app/?uid="; // Adjust this path as needed
// ---------------------

const techTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00f2fe' }, 
    secondary: { main: '#a855f7' }, 
    background: { default: '#0a0a0c', paper: '#111114' },
    text: { primary: '#ffffff', secondary: '#94a3b8' }
  },
  typography: {
    fontFamily: '"Inter", "JetBrains Mono", monospace',
    h2: { fontWeight: 800, letterSpacing: '-0.03em' },
  },
});

const Landing = () => {
  const [uid, setUid] = useState('');

  const handleRedirect = () => {
    if (uid.trim()) {
      // Redirects to your dashboard with the UID appended
      window.location.href = `${DASHBOARD_BASE_URL}${uid.trim()}`;
    }
  };

  return (
    <ThemeProvider theme={techTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0a0a0c 70%)',
        pb: 10,
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Subtle Background Detail */}
        <Box sx={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '40%', background: alpha('#00f2fe', 0.03),
          filter: 'blur(100px)', borderRadius: '50%', zIndex: 0
        }} />

        <Container maxWidth="lg" sx={{ py: 3, position: 'relative', zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: 'primary.main', transform: 'rotate(45deg)' }} />
              ATNDS<Box component="span" sx={{ color: 'primary.main', fontWeight: 400 }}>.SYS</Box>
            </Typography>
            <Chip 
              label="v2.0.4 - LIVE" 
              sx={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.7rem', height: 26, border: '1px solid rgba(0,242,254,0.3)', color: 'primary.main' }} 
            />
          </Stack>
        </Container>

        <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
          
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '2.8rem', md: '5rem' }, lineHeight: 1.1 }}>
              Neural Access <br />
              <Box component="span" sx={{ 
                background: 'linear-gradient(90deg, #fff 0%, #64748b 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Gateway</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 650, mx: 'auto', fontSize: '1.1rem', fontWeight: 300 }}>
              The official portal for the Telegram Attendance Tracker. Connect your account or 
              access your biometric dashboard below.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {/* Primary Redirect: Telegram Bot */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ 
                p: 5, height: '100%', borderRadius: 8,
                background: alpha('#ffffff', 0.01),
                borderColor: alpha('#ffffff', 0.08),
                transition: '0.3s',
                '&:hover': { borderColor: 'primary.main', background: alpha('#00f2fe', 0.02) }
              }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: alpha('#00f2fe', 0.1), color: 'primary.main', width: 56, height: 56 }}>
                    <Telegram fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">Bot Sync</Typography>
                    <Typography variant="caption" color="text.secondary">TELEGRAM_PROTOCOL_v1</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5, minHeight: 48 }}>
                  Initialize your tracking session and mark daily attendance via our official 
                  Telegram bot. Secure MTProto integration.
                </Typography>
                <Button 
                  fullWidth
                  variant="contained" 
                  size="large"
                  href="https://web.telegram.org/k/#@Attendance009bot"
                  target="_blank"
                  sx={{ 
                    py: 2, borderRadius: 4, fontWeight: 'bold', fontSize: '1rem',
                    background: '#fff', color: '#000', textTransform: 'none',
                    '&:hover': { background: alpha('#fff', 0.9) }
                  }}
                >
                  Launch Bot Interface
                </Button>
              </Paper>
            </Grid>

            {/* Quick Access: UID Dashboard */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ 
                p: 5, height: '100%', borderRadius: 8,
                background: 'linear-gradient(145deg, #111114, #0a0a0c)',
                borderColor: alpha('#ffffff', 0.08),
                transition: '0.3s',
                '&:hover': { borderColor: 'secondary.main' }
              }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: alpha('#a855f7', 0.1), color: 'secondary.main', width: 56, height: 56 }}>
                    <Fingerprint fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">User Dashboard</Typography>
                    <Typography variant="caption" color="text.secondary">ANALYTICS_GATEWAY</Typography>
                  </Box>
                </Stack>
                
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, minHeight: 48 }}>
                  Enter your unique Student ID to retrieve your attendance heatmap 
                  and AI-generated performance summaries.
                </Typography>

                <TextField
                  fullWidth
                  placeholder="Enter Student UID..."
                  variant="outlined"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  InputProps={{
                    sx: { borderRadius: 4, bgcolor: 'rgba(0,0,0,0.4)', fontFamily: 'monospace' }
                  }}
                  sx={{ mb: 2 }}
                />
                
                <Button 
                  fullWidth
                  disabled={!uid}
                  onClick={handleRedirect}
                  variant="outlined" 
                  endIcon={<ArrowForward />}
                  sx={{ 
                    py: 2, borderRadius: 4, fontWeight: 'bold', 
                    borderColor: 'rgba(255,255,255,0.2)', color: '#fff',
                    textTransform: 'none',
                    '&:hover': { borderColor: 'secondary.main', bgcolor: alpha('#a855f7', 0.05) }
                  }}
                >
                  Enter Dashboard
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Infrastructure Specs */}
          <Grid container spacing={2} sx={{ mt: 6 }}>
            {[
              { icon: <Analytics fontSize="small"/>, title: "Neural Analytics", desc: "Trend modeling" },
              { icon: <Security fontSize="small"/>, title: "Secure Endpoints", desc: "Data protection" },
              { icon: <Hub fontSize="small"/>, title: "Global Sync", desc: "Real-time updates" },
              { icon: <Terminal fontSize="small"/>, title: "Node Access", desc: "Developer tools" }
            ].map((item, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Box sx={{ 
                  p: 2, borderRadius: 4, bgcolor: alpha('#fff', 0.01), 
                  border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' 
                }}>
                  <Box sx={{ color: 'primary.main', mb: 0.5, opacity: 0.8 }}>{item.icon}</Box>
                  <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', letterSpacing: 1 }}>{item.title}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Box sx={{ mt: 12, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.3, letterSpacing: 3 }}>
              ARCH_ID: SATYAM_DEV // PROTOCOL_HOST: VERCEL
            </Typography>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;