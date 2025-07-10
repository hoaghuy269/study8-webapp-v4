import 'src/global.css';

import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTopButton = showScroll && (
    <Fab
      color="primary"
      size="small"
      onClick={handleScrollToTop}
      sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );

  return (
    <ThemeProvider>
      <Router />
      {scrollToTopButton}
    </ThemeProvider>
  );
}
