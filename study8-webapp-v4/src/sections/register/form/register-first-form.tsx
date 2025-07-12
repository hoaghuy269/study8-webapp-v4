import { t } from 'i18next';
import {useState} from "react";
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import {Iconify} from "../../../components/iconify";
import {registerOTP, registerCreate} from "../service/service";
import {useAlert, ALERT_SEVERITY} from "../../../hooks/use-alert";

type RegisterFirstFormProps = {
  nextStep: () => void;
  setId: (id: any) => void;
};

const RegisterFirstForm = ({ nextStep, setId }: RegisterFirstFormProps) => {
  const { showSnackbar } = useAlert();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    email: string;
  };

  const handleRegister = async (data: FormData) => {
    try {
      setLoading(true);
      
      // Step 1: Call API to create
      const resCreate = await registerCreate(data.email);

      if (resCreate.id !== null) {
        setId(resCreate.id);

        // Step 2: Call API to send OTP
        await registerOTP(resCreate.id);
      }

      // Note: Go to next step
      nextStep();
    } catch (error) {
      showSnackbar(error, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(handleRegister)}>
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          loading={loading}
        >
          {t('button.register')}
        </LoadingButton>
      </Box>
    </form>
  );

  return (
    <>
      {renderForm}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          {t('text.or')}
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
};

export default RegisterFirstForm;
