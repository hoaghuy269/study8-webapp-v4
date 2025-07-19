import { t } from 'i18next';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { TabPanel, TabContext } from '@mui/lab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from '../../../routes/hooks';
import { getClassDetail } from '../service/service';
import { Iconify } from '../../../components/iconify';
import { DashboardContent } from '../../../layouts/dashboard';

import type { ClassResponse } from '../../class/type/class-response';

// ----------------------------------------------------------------------

export function ClassDetailView() {
  const router = useRouter();
  const { classId } = useParams();
  const [classLoading, setClassLoading] = useState(true);
  const [classDetail, setClassDetail] = useState<ClassResponse | null>(null);
  const [tab, setTab] = useState('topic');

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        setClassLoading(true);
        const response = await getClassDetail(Number(classId));

        if (response) {
          setClassDetail(response);
        }
      } catch (error) {
        router.push(`/404`);
      } finally {
        setClassLoading(false);
      }
    };

    fetchClassDetail();
  }, [classId, router]);

  const renderSkeleton = () => (
    <Box display="flex" alignItems="center" mb={2}>
      <Box flexGrow={1}>
        <Skeleton variant="text" width={300} height={40} />
      </Box>
      <Skeleton variant="circular" width={28} height={28} />
    </Box>
  );

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
          123
        </TabPanel>
        <TabPanel value="member" sx={{ p: 0, mt: 3 }}>
          123
        </TabPanel>
      </TabContext>
    </Box>
  );

  const renderHeader = () => {
    if (classLoading) {
      renderSkeleton();
    }
    return (
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" flexGrow={1}>
          <Link to="/class" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('text.class')}
          </Link>
          {' > '}
          <span style={{ color: '#888' }}>{classDetail?.name}</span>
        </Typography>
        <IconButton onClick={() => alert('Mở cài đặt')}>
          <Iconify icon="mdi:cog" width="28px" color="#000" />
        </IconButton>
      </Box>
    );
  };

  return (
    <DashboardContent>
      {renderHeader()}
      {renderTabs()}
    </DashboardContent>
  );
}
