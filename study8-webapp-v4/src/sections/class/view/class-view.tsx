import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { getClasses } from '../service/service';
import { useRouter } from '../../../routes/hooks';
import { ClassItem } from '../component/class-item';
import { WORKSPACE } from '../../../constant/workspace';
import { useWorkspace } from '../../../hooks/use-workspace';
import { DashboardContent } from '../../../layouts/dashboard';
import { JoinClassDialog } from '../dialog/join-class-dialog';
import { CreateClassDialog } from '../dialog/create-class-dialog';
import {
  DEFAULT_SEARCH,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_START,
  DEFAULT_CIRCULAR_PROGRESS_SIZE,
} from '../../../constant/pagination';

import type { ClassResponse } from '../type/class-response';
import type { ClassListRequest } from '../type/class-list-request';

// ----------------------------------------------------------------------

export function ClassView() {
  const { t } = useTranslation();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassResponse[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE_START);
  const [orderBy] = useState(DEFAULT_ORDER_BY);
  const [search] = useState(DEFAULT_SEARCH);
  const [hasMore, setHasMore] = useState(true);
  const { workspace } = useWorkspace();
  const [loading, setLoading] = useState(true);
  const [createClassDialog, setCreateClassDialog] = useState(false);
  const [joinClassDialog, setJoinClassDialog] = useState(false);

  const fetchClasses = async () => {
    try {
      if (page === DEFAULT_PAGE_START) {
        setLoading(true);
      }

      const params: ClassListRequest = {
        page: page - 1,
        size: DEFAULT_PAGE_SIZE,
        orderBy,
        search,
        workspace,
      };

      const response = await getClasses(params);
      if (response) {
        setClasses((prev) => [...prev, ...response.datas]);
        setHasMore(classes.length + response.datas.length < response.totalData);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setClasses([]);
    setPage(DEFAULT_PAGE_START);
    setHasMore(true);
    fetchClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace, orderBy, search]);

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Grid>
      ))}
    </Grid>
  );

  const renderButton = () => (
    <Box display="flex" alignItems="center" justifyContent="flex-end" mb={5}>
      {workspace === WORKSPACE.TEACHER ? (
        <Button
          onClick={() => {
            setCreateClassDialog(true);
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          {t('button.createClass')}
        </Button>
      ) : (
        <Button
          onClick={() => {
            setJoinClassDialog(true);
          }}
          variant="contained"
          startIcon={<GroupAddIcon />}
        >
          {t('button.joinClass')}
        </Button>
      )}
    </Box>
  );

  const renderDialog = () => (
    <>
      <CreateClassDialog open={createClassDialog} handleClose={() => setCreateClassDialog(false)} />
      <JoinClassDialog open={joinClassDialog} handleClose={() => setJoinClassDialog(false)} />
    </>
  );

  const renderClasses = () => {
    if (loading) {
      return <Box px={3}>{renderSkeleton()}</Box>;
    }
    if (classes.length === 0) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100%">
          <Typography variant="h6" color="textSecondary">
            {t('text.noData')}
          </Typography>
        </Box>
      );
    }
    return (
      <InfiniteScroll
        dataLength={classes.length}
        next={fetchClasses}
        hasMore={hasMore}
        loader={
          <Grid container justifyContent="center" sx={{ my: 2 }}>
            <CircularProgress size={DEFAULT_CIRCULAR_PROGRESS_SIZE} color="primary" />
          </Grid>
        }
        style={{
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Grid container spacing={3}>
          {classes.map((classItem) => (
            <Grid key={classItem.id} xs={12} sm={6} md={3}>
              <Box
                onClick={() => router.push(`/class/${classItem.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                <ClassItem latestPost={false} latestPostLarge={false} classItem={classItem} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    );
  };

  return (
    <DashboardContent>
      {renderButton()}
      {renderClasses()}
      {renderDialog()}
    </DashboardContent>
  );
}
