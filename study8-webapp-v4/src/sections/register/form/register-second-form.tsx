import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import OtpInput from '../../../components/otp/otp-input';
import { registerOTP, registerVerify } from '../service/service';
import { useAlert, ALERT_SEVERITY } from '../../../hooks/use-alert';

type RegisterSecondFormProps = {
  nextStep: () => void;
  id: any;
};

const RegisterSecondForm = ({ nextStep, id }: RegisterSecondFormProps) => {
  const { showSnackbar } = useAlert();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState('');
  const { handleSubmit } = useForm<FormData>();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    return undefined;
  }, [countdown]);

  const handleResendOTP = async () => {
    if (countdown === 0 && !isResending) {
      setCountdown(20);
      setIsResending(true);

      try {
        await registerOTP(id);
      } catch (error) {
        showSnackbar(error, ALERT_SEVERITY.ERROR);
      } finally {
        setIsResending(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);

      // Step 1: Call API verify OTP
      await registerVerify(id, otp);

      // Step 2: Go to next step
      nextStep();
    } catch (error) {
      showSnackbar(error, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleVerifyOTP)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1.5}
        sx={{ maxWidth: 400, mx: 'auto' }}
      >
        <OtpInput value={otp} onChange={setOtp} length={6} separator="" />

        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t('text.notReceiveCode')}{' '}
          <Link
            component="button"
            variant="body2"
            onClick={handleResendOTP}
            disabled={countdown > 0 || isResending}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              opacity: countdown > 0 ? 0.5 : 1,
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {isResending ? (
              <CircularProgress size={16} thickness={6} color="inherit" />
            ) : countdown > 0 ? (
              `${t('button.resendIn')} ${countdown}s`
            ) : (
              t('button.resend')
            )}
          </Link>
        </Typography>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          loading={loading}
          disabled={otp.length !== 6}
        >
          {t('button.submit')}
        </LoadingButton>
      </Box>
    </form>
  );
};

export default RegisterSecondForm;
