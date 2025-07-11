import { useContext } from 'react';

import { SnackbarContext } from '../components/snackbar/snackbar-provider';

export const useAlert = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('use-alert.ts | Error | useAlert must be used within a SnackbarProvider');
  }
  return context;
};

export const ALERT_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;
