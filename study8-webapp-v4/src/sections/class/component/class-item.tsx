import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import type {ClassResponse} from "../type/class-response";

// ----------------------------------------------------------------------

export function ClassItem({
  sx,
  classItem,
  latestPost,
  latestPostLarge,
  ...other
}: CardProps & {
  classItem: ClassResponse;
  latestPost: boolean;
  latestPostLarge: boolean;
}) {
  const renderAvatar = (
    <Avatar
      alt="Avatar"
      src={classItem.avatarUrl}
      sx={{
        left: 24,
        zIndex: 9,
        bottom: -24,
        position: 'absolute',
        ...((latestPostLarge || latestPost) && {
          top: 24,
        }),
      }}
    />
  );

  const renderTitle = (
    <Stack spacing={0.3}>
      <Link
        color="inherit"
        variant="subtitle2"
        underline="hover"
        title={classItem.name}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          display: 'block',
          width: '100%',
          ...(latestPostLarge && { typography: 'h5' }),
          ...((latestPostLarge || latestPost) && {
            color: 'common.white',
          }),
        }}
      >
        {classItem.name}
      </Link>

      <Typography
        variant="body2"
        color="text.secondary"
        title={classItem.description}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
      >
        {classItem.description || '\u00A0'}
      </Typography>
    </Stack>
  );

  const renderInfo = (
    <Box
      gap={1.5}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: classItem.totalMember, icon: 'mdi:account-group' },
        { number: 0, icon: 'solar:clipboard-bold' },
      ].map((info, _index) => (
        <Box
          key={_index}
          display="flex"
          alignItems="center"
          sx={{
            ...((latestPostLarge || latestPost) && {
              opacity: 0.64,
              color: 'common.white',
            }),
          }}
        >
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
        </Box>
      ))}

      <Iconify
        width={16}
        icon={classItem.publicFlag ? 'mdi:earth' : 'solar:lock-bold'}
        sx={{
          ...((latestPostLarge || latestPost) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      />
    </Box>
  );

  const renderCover = (
    <Box
      component="img"
      alt="TODO: Cover"
      src={classItem.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDate(classItem.createdDate)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      width={88}
      height={36}
      src="/assets/icons/shape-avatar.svg"
      sx={{
        left: 0,
        zIndex: 9,
        bottom: -16,
        position: 'absolute',
        color: 'background.paper',
        ...((latestPostLarge || latestPost) && { display: 'none' }),
      }}
    />
  );

  return (
    <Card sx={sx} {...other}>
      <Box
        sx={(theme) => ({
          position: 'relative',
          pt: 'calc(100% * 3 / 4)',
          ...((latestPostLarge || latestPost) && {
            pt: 'calc(100% * 4 / 3)',
            '&:after': {
              top: 0,
              content: "''",
              width: '100%',
              height: '100%',
              position: 'absolute',
              bgcolor: varAlpha(theme.palette.grey['900Channel'], 0.72),
            },
          }),
          ...(latestPostLarge && {
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }),
        })}
      >
        {renderShape}
        {renderAvatar}
        {renderCover}
      </Box>

      <Box
        sx={(theme) => ({
          p: theme.spacing(6, 3, 3, 3),
          ...((latestPostLarge || latestPost) && {
            width: 1,
            bottom: 0,
            position: 'absolute',
          }),
        })}
      >
        {renderDate}
        {renderTitle}
        {renderInfo}
      </Box>
    </Card>
  );
}
