import { apiService } from '../../../services/api-service';
import { API_REGISTER, API_CONSTANT_PUBLIC } from '../../../constant/api-path';

import type { RegisterResponse } from '../type/register-response';
import type { ApiResponse } from '../../../libs/types/api-response';
import type { ConstantResponse } from '../../../libs/types/constant-response';
import type { PaginationResponse } from '../../../libs/types/pagination-response';

export const registerCreate = async (email: string): Promise<RegisterResponse> => {
  const response = await apiService.post<ApiResponse<RegisterResponse>>(API_REGISTER, {
    email,
    step: 'CREATE',
  });
  return response.data;
};

export const registerOTP = async (id: number): Promise<RegisterResponse> => {
  const response = await apiService.post<ApiResponse<RegisterResponse>>(API_REGISTER, {
    id,
    step: 'OTP',
  });
  return response.data;
};

export const registerVerify = async (id: number, otp: string): Promise<RegisterResponse> => {
  const response = await apiService.post<ApiResponse<RegisterResponse>>(API_REGISTER, {
    id,
    otp,
    step: 'VERIFY',
  });
  return response.data;
};

export const registerSubmit = async (
  id: number,
  name: string,
  workspace: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await apiService.post<ApiResponse<RegisterResponse>>(API_REGISTER, {
    id,
    name,
    workspace,
    password,
    step: 'SUBMIT',
  });
  return response.data;
};

export const getRoles = async (search: string): Promise<PaginationResponse<ConstantResponse>> => {
  const response = await apiService.get<ApiResponse<PaginationResponse<ConstantResponse>>>(
    API_CONSTANT_PUBLIC,
    {
      search,
      groupCode: 'WORKSPACE',
    }
  );
  return response.data;
};
