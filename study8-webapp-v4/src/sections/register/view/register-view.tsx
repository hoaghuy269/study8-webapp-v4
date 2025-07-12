import { t } from 'i18next';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {useRouter} from "../../../routes/hooks";
import RegisterFirstForm from '../form/register-first-form';
import RegisterThirdForm from "../form/register-third-form";
import RegisterSecondForm from '../form/register-second-form';
import RegisterSuccessForm from "../form/register-success-form";

// ----------------------------------------------------------------------

export function RegisterView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [id, setId] = useState(null);

  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">{t('text.createAnAccount')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('text.alreadyHaveAccount')}
          <Link variant="subtitle2" onClick={() => router.push('/sign-in')} sx={{ ml: 0.5, cursor: 'pointer' }}>
            {t('text.signIn')}
          </Link>
        </Typography>
      </Box>

      {currentStep === 1 && <RegisterFirstForm nextStep={nextStep} setId={setId} />}
      {currentStep === 2 && <RegisterSecondForm nextStep={nextStep} id={id} />}
      {currentStep === 3 && <RegisterThirdForm nextStep={nextStep} id={id} />}
      {currentStep === 4 && <RegisterSuccessForm />}
    </>
  );
}
