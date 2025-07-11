import {API_LOGIN} from "../../../constant/api-path";
import {apiService} from "../../../services/api-service";

import type {SignInResponse} from "../type/sign-in-response";
import type {ApiResponse} from "../../../libs/types/api-response";


export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
  const res = await apiService.post<ApiResponse<SignInResponse>>(API_LOGIN, {
    username: email,
    password,
  });

  return res.data;
};
