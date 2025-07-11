import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import i18n from './i18n';
import { SnackbarProvider } from './components/snackbar/snackbar-provider';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <StrictMode>
  <I18nextProvider i18n={i18n}>
    <HelmetProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </SnackbarProvider>
    </HelmetProvider>{' '}
  </I18nextProvider>
  // </StrictMode>
);
