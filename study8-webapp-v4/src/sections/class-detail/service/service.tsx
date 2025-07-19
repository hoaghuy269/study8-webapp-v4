import { API_CLASS } from '../../../constant/api-path';
import { apiService } from '../../../services/api-service';

import type { ApiResponse } from '../../../libs/types/api-response';
import type { ClassResponse } from '../../class/type/class-response';

export const getClassDetail = async (id: number): Promise<ClassResponse> => {
  const response = await apiService.get<ApiResponse<ClassResponse>>(`${API_CLASS}/${id}`);

  return response.data;
};
