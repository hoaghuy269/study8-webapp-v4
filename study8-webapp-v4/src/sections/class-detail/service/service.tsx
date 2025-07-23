import { useApiService } from '../../../hooks/use-api-service';
import {API_CLASS, API_POST_LIST} from '../../../constant/api-path';

import type {PostResponse} from "../type/post-response";
import type {PostListRequest} from "../type/post-list-request";
import type { ApiResponse } from '../../../libs/types/api-response';
import type { ClassResponse } from '../../class/type/class-response';
import type {PaginationResponse} from "../../../libs/types/pagination-response";

export function useClassDetailService() {
  const { get } = useApiService();

  const getClassDetail = async (id: number): Promise<ClassResponse | undefined> => {
    const response = await get<ApiResponse<ClassResponse>>(`${API_CLASS}/${id}`);
    return response?.data;
  };

  const getPosts = async (
      params: PostListRequest
  ): Promise<PaginationResponse<PostResponse> | undefined> => {
    const response = await get<ApiResponse<PaginationResponse<PostResponse>>>(API_POST_LIST, {
      page: params.page,
      size: params.size,
      orderBy: params.orderBy,
      search: params.search,
      classId: params.classId,
    });
    return response?.data;
  };

  return {
    getClassDetail,
    getPosts,
  };
}
