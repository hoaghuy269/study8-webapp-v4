import { t } from 'i18next';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

import { useRouter } from '../../../routes/hooks';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const RegisterSuccessForm = () => {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mt={0}>
      <MotionBox
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: green[50],
          boxShadow: 3,
        }}
      >
        <SchoolRoundedIcon sx={{ fontSize: 50, color: green[600] }} />
      </MotionBox>

      <MotionTypography
        variant="h5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        sx={{ mt: 3, fontWeight: 'bold', color: green[600] }}
      >
        {t('text.registerSuccess')}
      </MotionTypography>

      <MotionTypography
        variant="body2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        sx={{ mt: 1, color: 'text.secondary', maxWidth: 360 }}
      >
        {t('text.registerSuccessMessage')}
      </MotionTypography>

      <MotionButton
        variant="contained"
        color="primary"
        onClick={() => router.push('/sign-in')}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        sx={{ mt: 4, minWidth: 200 }}
      >
        {t('button.goToLogin')}
      </MotionButton>
    </Box>
  );
};

export default RegisterSuccessForm;
