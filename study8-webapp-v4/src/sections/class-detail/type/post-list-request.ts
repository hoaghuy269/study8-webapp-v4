import type { PaginationRequest } from '../../../libs/types/pagination-request';

export interface PostListRequest extends PaginationRequest {
  classId: number | undefined;
}
