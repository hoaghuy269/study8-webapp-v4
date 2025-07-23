import type { PostDocumentResponse } from './post-document-response';

export interface PostResponse {
  id: number;
  classId: number;
  content: string;
  createdId: number;
  createdName: string;
  createdAvatarUrl: string;
  createdDate: Date;
  totalLike: number;
  totalComment: number;
  likeType: string;
  documentList: PostDocumentResponse[];
}
