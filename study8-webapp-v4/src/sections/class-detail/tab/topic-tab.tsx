import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { red, blue, green } from '@mui/material/colors';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { assignments } from '../../../_mock';
import { useClassDetailService } from '../service/service';
import { useUserProfile } from '../../../hooks/use-user-profile';
import {
  DEFAULT_SEARCH,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_START,
  DEFAULT_CIRCULAR_PROGRESS_SIZE,
} from '../../../constant/pagination';

import type { PostResponse } from '../type/post-response';
import type { PostListRequest } from '../type/post-list-request';
import type { ClassResponse } from '../../class/type/class-response';

export type TopicTabProps = {
  classDetail: ClassResponse | null;
};

export function TopicTab(props: TopicTabProps) {
  const { classDetail } = props;
  const { t } = useTranslation();
  const { userProfile } = useUserProfile();
  const { getPosts } = useClassDetailService();
  const [page, setPage] = useState(DEFAULT_PAGE_START);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [search] = useState(DEFAULT_SEARCH);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      if (page === DEFAULT_PAGE_START) {
        setLoadingPosts(true);
      }

      const params: PostListRequest = {
        page: page - 1,
        size: DEFAULT_PAGE_SIZE,
        orderBy: DEFAULT_ORDER_BY,
        search,
        classId: classDetail?.id,
      };

      const response = await getPosts(params);
      if (response) {
        setPosts((prev) => [...prev, ...response.datas]);
        setHasMore(posts.length + response.datas.length < response.totalData);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setPage(DEFAULT_PAGE_START);
    setHasMore(true);
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderCard = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3} order={{ xs: 0, sm: 0 }}>
        {renderClassDetailCard()}
        {renderExerciseCard()}
      </Grid>
      <Grid item xs={12} sm={9}>
        {renderCreateTopicCard()}
      </Grid>
    </Grid>
  );

  const renderTopics = () => (
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
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
        Loren ipsum
      </InfiniteScroll>
    );

  const renderCreateTopicCard = () => (
    <Box
      component="section"
      sx={{
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        direction={{ xs: 'row', sm: 'row' }}
        wrap="nowrap"
      >
        <Grid item>
          <Avatar sx={{ width: 48, height: 48 }} src={userProfile?.accountAvatarUrl} />
        </Grid>

        <Grid item sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            placeholder={t('text.announceSomethingToClass')}
            variant="outlined"
            size="small"
            multiline
            minRows={1}
            maxRows={5}
            InputProps={{
              readOnly: true,
              sx: { cursor: 'pointer' },
            }}
            // onClick={handleOpenCreateTopicDialog}
            inputProps={{
              style: { cursor: 'pointer' },
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }} justifyContent="center">
        <Grid item>
          <Button
            color="inherit"
            startIcon={<DescriptionOutlinedIcon sx={{ color: green[500] }} />}
          >
            <Typography variant="body2" fontWeight={500}>
              {t('text.photoAndDocument')}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" startIcon={<EventNoteIcon sx={{ color: blue[500] }} />}>
            <Typography variant="body2" fontWeight={500}>
              {t('text.exercise')}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" startIcon={<EventAvailableIcon sx={{ color: red[500] }} />}>
            <Typography variant="body2" fontWeight={500}>
              {t('text.event')}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderExerciseCard = () => (
    <Box
      sx={{
        position: 'sticky',
        top: 235,
        p: 2,
        mb: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
        maxHeight: 250,
        overflowY: 'auto',
      }}
    >
      <Typography variant="body1" fontWeight={500} mb={1} textAlign="center">
        Bài tập
      </Typography>
      {assignments.map((assignment) => (
        <Box
          key={assignment.id}
          sx={{
            p: 1,
            borderBottom: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={500}>
              {assignment.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hạn: {assignment.deadline}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => alert(`Xem bài tập: ${assignment.title}`)}>
            <VisibilityIcon sx={{ fontSize: 24, color: '#1976d2' }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );

  const renderClassDetailCard = () => (
    <Box
      sx={{
        position: 'sticky',
        top: 80,
        p: 2,
        mb: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
        {t('text.classCode')}
      </Typography>
      <Typography variant="h5" color={blue[500]}>
        {classDetail?.code}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        onClick={() => alert('Mời tham gia lớp học!')}
      >
        Mời tham gia lớp học
      </Button>
    </Box>
  );

  return <>{renderCard()}</>;
}
