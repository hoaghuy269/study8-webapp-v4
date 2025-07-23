import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

import { fRelative } from '../../../utils/format-time';

import type { PostResponse } from '../type/post-response';

export type TopicItemProps = {
  post: PostResponse | null;
};

export function TopicItem(props: TopicItemProps) {
  const { post } = props;
  const { t } = useTranslation();

  const renderCard = () => (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <CardContent> {renderAuthor()}</CardContent>
    </Card>
  );

  const renderAuthor = () => (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar src={post?.createdAvatarUrl} sx={{ width: 48, height: 48 }} />
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle1" fontWeight={600}>
          {post?.createdName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fRelative(post?.createdDate)}
        </Typography>
      </Grid>
    </Grid>
  );

  return <>{renderCard()}</>;
}
