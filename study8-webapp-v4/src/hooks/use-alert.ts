import { useContext } from 'react';

import { SnackbarContext } from '../components/snackbar/snackbar-provider';

export const useAlert = () => useContext(SnackbarContext);