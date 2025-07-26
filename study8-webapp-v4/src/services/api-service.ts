import { axiosClient } from '../libs/axios/axios-client';

export const apiService = {
  get: <T>(url: string, params?: any) => handleRequest<T>(axiosClient.get(url, { params })),

  post: <T>(url: string, data?: any) => handleRequest<T>(axiosClient.post(url, data)),

  put: <T>(url: string, data?: any) => handleRequest<T>(axiosClient.put(url, data)),

  delete: <T>(url: string) => handleRequest<T>(axiosClient.delete(url)),

  postFormData: <T>(url: string, formData: FormData) =>
    handleRequest<T>(
      axiosClient.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ),

  getBlob: (url: string) =>
    handleBlobRequest(
      axiosClient.get(url, {
        responseType: 'blob',
      })
    ),
};

const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
  try {
    const response = await request;
    return response.data as T;
  } catch (error: any) {
    throw error.response?.data?.message || 'Unexpected error';
  }
};

const handleBlobRequest = async (request: Promise<any>): Promise<Blob> => {
  try {
    const response = await request;
    return response.data as Blob;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to fetch blob';
  }
};
