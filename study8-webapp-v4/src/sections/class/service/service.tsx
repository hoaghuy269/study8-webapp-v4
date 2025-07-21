import { useApiService } from '../../../hooks/use-api-service';
import { API_CLASS, API_CLASS_JOIN, API_CLASS_LIST } from '../../../constant/api-path';

import type { ClassResponse } from '../type/class-response';
import type { ClassListRequest } from '../type/class-list-request';
import type { ApiResponse } from '../../../libs/types/api-response';
import type { PaginationResponse } from '../../../libs/types/pagination-response';

export function useClassService() {
  const { get, post } = useApiService();

  const getClasses = async (
    params: ClassListRequest
  ): Promise<PaginationResponse<ClassResponse> | undefined> => {
    const response = await get<ApiResponse<PaginationResponse<ClassResponse>>>(API_CLASS_LIST, {
      page: params.page,
      size: params.size,
      orderBy: params.orderBy,
      search: params.search,
      workspace: params.workspace,
    });
    return response?.data;
  };

  const createClass = async (
    name: string,
    description: string,
    publicFlag: boolean
  ): Promise<ClassResponse | undefined> => {
    const response = await post<ApiResponse<ClassResponse>>(API_CLASS, {
      name,
      description,
      publicFlag,
    });
    return response?.data;
  };

  const joinClass = async (code: string): Promise<ClassResponse | undefined> => {
    const response = await post<ApiResponse<ClassResponse>>(API_CLASS_JOIN, {
      code,
    });
    return response?.data;
  };

  return {
    getClasses,
    createClass,
    joinClass,
  };
}
