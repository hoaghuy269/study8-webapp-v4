import FilePreview from 'reactjs-file-preview';

import Box from '@mui/material/Box';

import { axiosClient } from '../../../libs/axios/axios-client';

import type { PostDocumentResponse } from '../type/post-document-response';

export type TopicFileProps = {
  documentList: PostDocumentResponse[] | null;
};

export function TopicFile(props: TopicFileProps) {
  const { documentList } = props;

  return (
    <>
      {documentList?.map((document) => (
        <Box key={document.id}>
          <FilePreview
            preview={document.url}
            axiosInstance={axiosClient}
            errorImage="https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png"
          />
        </Box>
      ))}
    </>
  );
}
