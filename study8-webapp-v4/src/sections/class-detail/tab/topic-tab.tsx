import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { assignments } from '../../../_mock';

import type { ClassResponse } from '../../class/type/class-response';

export type TopicTabProps = {
  classDetail: ClassResponse | null;
};

export function TopicTab(props: TopicTabProps) {
  const { classDetail } = props;
  const { t } = useTranslation();

  const renderCard = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3} order={{ xs: 0, sm: 0 }}>
        {renderClassDetailCard()}
        {renderExerciseCard()}
      </Grid>
    </Grid>
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
