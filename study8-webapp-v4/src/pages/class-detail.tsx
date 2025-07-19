import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { CONFIG } from 'src/config-global';

import {ClassDetailView} from "../sections/class-detail";

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{`${t('text.class')} - ${CONFIG.appName}`}</title>
      </Helmet>

      <ClassDetailView />
    </>
  );
}
