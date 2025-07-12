import { t } from 'i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useRouter } from '../../../routes/hooks';

const RegisterSuccessForm = () => {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mt={5}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: green[50],
          boxShadow: 3,
        }}
      >
        <CheckCircleRoundedIcon sx={{ fontSize: 80, color: green[600] }} />
      </Box>

      <Typography variant="h5" sx={{ mt: 3, fontWeight: 'bold', color: green[600] }}>
        {t('text.registerSuccess')}
      </Typography>

      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary', maxWidth: 360 }}>
        {t('text.registerSuccessMessage')}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4, minWidth: 200 }}
        onClick={() => router.push('/sign-in')}
      >
        {t('button.goToLogin')}
      </Button>
    </Box>
  );
};

export default RegisterSuccessForm;
