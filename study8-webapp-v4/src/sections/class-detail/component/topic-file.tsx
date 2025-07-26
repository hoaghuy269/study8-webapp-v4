import { useState, useEffect } from 'react';
import FilePreview from 'reactjs-file-preview';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { useClassDetailService } from '../service/service';

import type { PostDocumentResponse } from '../type/post-document-response';

export type TopicFileProps = {
  documentList: PostDocumentResponse[] | null;
};

export function TopicFile(props: TopicFileProps) {
  const { documentList } = props;
  const { getFile } = useClassDetailService();
  const [fileMap, setFileMap] = useState<Record<number, File>>({});

  useEffect(() => {
    if (!documentList) return;

    const fetchFiles = async () => {
      const newMap: Record<number, File> = {};
      await Promise.all(
        documentList.map(async (doc) => {
          newMap[doc.id] = await getFile(doc.id, doc.name);
        })
      );
      setFileMap(newMap);
    };

    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentList]);

  const renderFilePreview = () =>
    documentList?.map((document) => {
      const file = fileMap[document.id];
      if (!file) return null;

      const fileType = file.type;
      const fileName = document.name;

      let previewNode: React.ReactNode;

      if (fileType.startsWith('image/') || fileType === 'application/pdf') {
        // Case: image/pdf
        previewNode = (
          <FilePreview preview={file} errorImage="/assets/icons/application/error-icon.svg" />
        );
      } else if (
        fileName.toLowerCase().endsWith('.xls') ||
        fileName.toLowerCase().endsWith('.xlsx')
      ) {
        // Case: excel
        previewNode = (
          <Box
            component="img"
            src="/assets/icons/application/excel-icon.svg"
            alt="Excel Icon"
            sx={{ width: 80, height: 80 }}
          />
        );
      } else if (
        fileName.toLowerCase().endsWith('.doc') ||
        fileName.toLowerCase().endsWith('.docx')
      ) {
        // Case: excel
        previewNode = (
          <Box
            component="img"
            src="/assets/icons/application/word-icon.svg"
            alt="Excel Icon"
            sx={{ width: 80, height: 80 }}
          />
        );
      } else {
        return <InsertDriveFileIcon sx={{ fontSize: 80, color: '#1976d2' }} />;
      }

      return (
        <Grid
          item
          xs={4}
          sm={2}
          md={2}
          key={document.id}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              overflow: 'hidden',
              '&:hover .file-name': {
                color: 'primary.main',
                cursor: 'pointer',
              },
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: 3,
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 120,
                mb: 0.5,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {previewNode}
            </Box>
            <Box
              className="file-name"
              title={fileName}
              sx={{
                fontSize: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                pl: 1,
                pr: 1,
              }}
            >
              {fileName}
            </Box>
          </Box>
        </Grid>
      );
    });

  return (
    <Box mt={1}>
      <Grid container spacing={1}>
        {renderFilePreview()}
      </Grid>
    </Box>
  );
}
