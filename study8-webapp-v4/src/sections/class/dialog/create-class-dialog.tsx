import type { FC } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useRouter } from '../../../routes/hooks';
import { useClassService } from '../service/service';
import { useAlert, ALERT_SEVERITY } from '../../../hooks/use-alert';

interface CreateClassDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateClassDialog: FC<CreateClassDialogProps> = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showSnackbar } = useAlert();
  const [loading, setLoading] = useState(false);
  const { createClass } = useClassService();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    name: string;
    description: string;
    publicFlag: boolean;
  };

  const handleCreateClass = async (data: FormData) => {
    try {
      setLoading(true);

      const result = await createClass(data.name, data.description, data.publicFlag);
      if (result?.id) {
        handleClose();
        router.push(`/class/${result.id}`);
      }
    } catch (error) {
      showSnackbar(error, ALERT_SEVERITY.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('text.createNewClass')}</DialogTitle>
      <form onSubmit={handleSubmit(handleCreateClass)}>
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>{t('text.startClass')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('text.className')}
            type="text"
            fullWidth
            variant="outlined"
            {...register('name', {
              required: t('error.classNameRequired'),
              maxLength: {
                value: 100,
                message: t('error.maxLength'),
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
          <TextField
            margin="dense"
            id="description"
            label={t('text.description')}
            type="text"
            fullWidth
            multiline
            minRows={3}
            maxRows={3}
            variant="outlined"
            {...register('description', {
              maxLength: {
                value: 255,
                message: t('error.maxLength'),
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message as string}
          />
          <Box sx={{ backgroundColor: '#f0f0f0', p: 2, borderRadius: 1, mt: 1 }}>
            <FormControlLabel
              control={
                <Controller
                  name="publicFlag"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value} color="primary" />
                  )}
                />
              }
              label={t('text.allowEveryoneToJoin')}
            />
          </Box>
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
