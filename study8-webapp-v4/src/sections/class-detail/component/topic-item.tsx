import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

import { fRelative } from '../../../utils/format-time';
import { DEFAULT_CONTENT_LINE } from '../../../constant/pagination';

import type { PostResponse } from '../type/post-response';

export type TopicItemProps = {
  post: PostResponse | null;
};

export function TopicItem(props: TopicItemProps) {
  const { post } = props;
  const { t } = useTranslation();
  const [contentExpand, setContentExpand] = useState(false);
  const showToggle = useMemo(() => {
    const content = post?.content ?? '';
    const contentLines = content.split('\n').length;
    return contentLines > DEFAULT_CONTENT_LINE || content.length > 150;
  }, [post?.content]);

  const renderCard = () => (
    <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        {renderAuthor()}
        {renderContent()}
      </CardContent>
    </Card>
  );

  const renderContent = () => (
    <>
      <Typography
        variant="body1"
        sx={{
          mt: 1,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: contentExpand ? 'none' : DEFAULT_CONTENT_LINE,
          whiteSpace: contentExpand ? 'normal' : 'initial',
        }}
      >
        {post?.content}
      </Typography>
      {showToggle && (
        <Typography
          variant="body2"
          onClick={() => setContentExpand(!contentExpand)}
          sx={{ mt: 0.5, color: 'primary.main', cursor: 'pointer' }}
        >
          {contentExpand ? t('button.hide') : t('button.unHide')}
        </Typography>
      )}
    </>
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
