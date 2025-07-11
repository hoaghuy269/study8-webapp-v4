import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material';

import React, { useMemo, useState, useCallback, createContext } from 'react';

import { Alert, Snackbar } from '@mui/material';

type SnackbarContextType = {
  showSnackbar: (message: string, severity?: AlertColor) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showSnackbar = useCallback((msg: string, level: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  }, []);

  const handleClose = () => setOpen(false);

  const contextValue = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
