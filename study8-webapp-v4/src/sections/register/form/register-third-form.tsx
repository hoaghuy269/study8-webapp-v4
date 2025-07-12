import type { SelectChangeEvent } from '@mui/material';

import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Select,
  Tooltip,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';

import { AUTH } from '../../../constant/pattern';
import { Iconify } from '../../../components/iconify';
import { getRoles, registerSubmit } from '../service/service';
import { useAlert, ALERT_SEVERITY } from '../../../hooks/use-alert';

type Props = {
  nextStep: () => void;
  id: any;
};

const RegisterForm = ({ nextStep, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');
  const [roleOptions, setRoleOptions] = useState<{ value: string; label: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles('');
        const data = response?.datas || [];
        setRoleOptions(
          data.map((item: { code: string; value: string }) => ({
            value: item.code,
            label: item.value,
          }))
        );
      } catch (error) {
        setRoleOptions([]);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmitForm = async (data: any) => {
    try {
      setLoading(true);

      // Step 1: Call API verify OTP
      await registerSubmit(id, data.name, data.role, data.password);

      // Step 2: Go to next step
      nextStep();
    } catch (exception) {
      showSnackbar(exception, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          label={t('text.name')}
          placeholder={t('text.name')}
          InputLabelProps={{ shrink: true }}
          {...register('name', { required: t('error.nameNotEmpty') })}
          error={!!errors.name}
          helperText={errors.name?.message as string}
          sx={{ mb: 3 }}
        />

        <Controller
          name="role"
          control={control}
          rules={{ required: t('error.roleRequired') }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.role} sx={{ mb: 3 }}>
              <InputLabel id="role-select-label">{t('text.role')}</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={field.value || ''}
                label={t('text.role')}
                onChange={(event: SelectChangeEvent) => field.onChange(event.target.value)}
                variant="outlined"
              >
                {loadingRoles ? (
                  <MenuItem disabled>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={16} />
                      {t('text.loading')}
                    </Box>
                  </MenuItem>
                ) : (
                  roleOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText>{errors.role?.message as string}</FormHelperText>
            </FormControl>
          )}
        />

        <Tooltip title={t('tooltip.password')} placement="top" arrow>
          <TextField
            fullWidth
            label={t('text.password')}
            placeholder="••••••••"
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: t('error.passwordRequired'),
              pattern: {
                value: AUTH.PASSWORD_PATTERN,
                message: t('error.passwordInvalid'),
              },
            })}
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
        </Tooltip>

        <TextField
          fullWidth
          label={t('text.retypePassword')}
          placeholder="••••••••"
          InputLabelProps={{ shrink: true }}
          type={showRePassword ? 'text' : 'password'}
          {...register('retypePassword', {
            required: t('error.retypePasswordRequired'),
            validate: (value) => value === password || t('error.retypePasswordNotMatch'),
          })}
          error={!!errors.retypePassword}
          helperText={errors.retypePassword?.message as string}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowRePassword(!showRePassword)} edge="end">
                  <Iconify icon={showRePassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
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
          sx={{ mb: 2 }}
        >
          {t('button.submit')}
        </LoadingButton>
      </Box>
    </form>
  );
};

export default RegisterForm;
