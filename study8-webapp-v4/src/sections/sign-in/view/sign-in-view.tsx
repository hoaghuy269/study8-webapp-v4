import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { signIn } from '../service/service';
import {TOKEN} from "../../../libs/constants/local-storage";
import { useAlert, ALERT_SEVERITY } from '../../../hooks/use-alert';

export function SignInView() {
  const router = useRouter();
  const { t } = useTranslation();
  const { showSnackbar } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    email: string;
    password: string;
  };

  const handleSignIn = async (data: FormData) => {
    try {
      setLoading(true);
      const result = await signIn(data.email, data.password);

      localStorage.setItem(TOKEN, result.token);
      router.push('/');
    } catch (error) {
      showSnackbar(error, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          label={t('text.email')}
          placeholder="mail@email.com"
          InputLabelProps={{ shrink: true }}
          {...register('email', {
            required: t('error.emailRequired'),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: t('error.emailInValid'),
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
          sx={{ mb: 3 }}
        />
        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          {t('text.forgotPassword')}
        </Link>

        <TextField
          fullWidth
          label={t('text.password')}
          placeholder="••••••••"
          InputLabelProps={{ shrink: true }}
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: t('error.passwordRequired') })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          loading={loading}
        >
          {t('button.signIn')}
        </LoadingButton>
      </Box>
    </form>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
