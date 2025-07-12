import { Helmet } from 'react-helmet-async';
import {useTranslation} from "react-i18next";

import { CONFIG } from 'src/config-global';

import {RegisterView} from "../sections/register";

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t('text.register')} - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
