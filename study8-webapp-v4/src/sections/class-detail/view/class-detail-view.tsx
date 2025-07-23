import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Tab, Tabs } from '@mui/material';
import { TabPanel, TabContext } from '@mui/lab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { TopicTab } from '../tab/topic-tab';
import { useRouter } from '../../../routes/hooks';
import { Iconify } from '../../../components/iconify';
import { useClassDetailService } from '../service/service';
import { DashboardContent } from '../../../layouts/dashboard';

import type { ClassResponse } from '../../class/type/class-response';

// ----------------------------------------------------------------------

export function ClassDetailView() {
  const router = useRouter();
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState<ClassResponse | null>(null);
  const [tab, setTab] = useState('topic');
  const { getClassDetail } = useClassDetailService();

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await getClassDetail(Number(classId));

        if (response) {
          setClassDetail(response);
        }
      } catch (error) {
        router.push(`/404`);
      }
    };

    fetchClassDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId, router]);

  const renderTabs = () => (
    <Box sx={{ maxWidth: '100%' }}>
      <TabContext value={tab}>
        <Tabs
          value={tab}
          onChange={(_event, newTab) => setTab(newTab)}
          variant="scrollable"
          scrollButtons={false}
        >
          <Tab label={t('text.topic')} value="topic" />
          <Tab label={t('text.member')} value="member" />
        </Tabs>
        <TabPanel value="topic" sx={{ p: 0, mt: 3 }}>
          {classDetail && <TopicTab classDetail={classDetail} />}
        </TabPanel>
        <TabPanel value="member" sx={{ p: 0, mt: 3 }}>
          123
        </TabPanel>
      </TabContext>
    </Box>
  );

  const renderHeader = () => (
    <Box display="flex" alignItems="center" mb={2}>
      <Link component="button" variant="h5" underline="hover" onClick={() => router.push('/class')}>
        {t('text.class')}
      </Link>
      <ChevronRightIcon sx={{ mx: 1, verticalAlign: 'middle' }} />
      <Typography variant="h5" flexGrow={1}>
        {classDetail?.name}
      </Typography>

      <IconButton onClick={() => alert('Mở cài đặt')}>
        <Iconify icon="mdi:cog" width="28px" color="#000" />
      </IconButton>
    </Box>
  );

  return (
    <DashboardContent>
      {renderHeader()}
      {renderTabs()}
    </DashboardContent>
  );
}
