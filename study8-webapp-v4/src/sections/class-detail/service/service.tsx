import { API_CLASS } from '../../../constant/api-path';
import { useApiService } from '../../../hooks/use-api-service';

import type { ApiResponse } from '../../../libs/types/api-response';
import type { ClassResponse } from '../../class/type/class-response';

export function useClassDetailService() {
  const { get } = useApiService();

  const getClassDetail = async (id: number): Promise<ClassResponse | undefined> => {
    const response = await get<ApiResponse<ClassResponse>>(`${API_CLASS}/${id}`);
    return response?.data;
  };

  return {
    getClassDetail,
  };
}
