import type { FC } from 'react';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useClassService } from '../service/service';
import { useAlert, ALERT_SEVERITY } from '../../../hooks/use-alert';

interface JoinClassDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const JoinClassDialog: FC<JoinClassDialogProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useAlert();
  const { joinClass } = useClassService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    code: string;
  };

  const handleJoinClass = async (data: FormData) => {
    try {
      setLoading(true);
      const result = await joinClass(data.code);

      // TODO: handle join class success
    } catch (error) {
      showSnackbar(error, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('text.joinClass')}</DialogTitle>
      <form onSubmit={handleSubmit(handleJoinClass)}>
        <DialogContent>
          <DialogContentText>{t('text.askYourTeacher')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('text.classCode')}
            type="text"
            fullWidth
            variant="outlined"
            {...register('code', {
              required: t('error.classCodeRequired'),
              maxLength: {
                value: 8,
                message: t('error.maxLength'),
              },
            })}
            error={!!errors.code}
            helperText={errors.code?.message as string}
            sx={{ mt: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.cancel')}</Button>
          <LoadingButton type="submit" loading={loading}>
            {t('button.submit')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
