import type { PaginationRequest } from '../../../libs/types/pagination-request';

export interface ClassListRequest extends PaginationRequest {
  workspace: string;
}
