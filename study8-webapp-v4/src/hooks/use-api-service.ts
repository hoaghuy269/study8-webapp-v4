import { useAlert } from './use-alert';
import { useRouter } from '../routes/hooks';
import { apiService } from '../services/api-service';
import { TOKEN } from '../libs/constants/local-storage';
import { UNAUTHORIZED } from '../constant/api-message-constant';

export function useApiService() {
  const router = useRouter();
  const { showSnackbar } = useAlert();

  const handleError = (error: any) => {
    if (error === UNAUTHORIZED) {
      localStorage.removeItem(TOKEN);
      router.push('/sign-in');
      showSnackbar('Session expired', 'error');
    } else {
      showSnackbar(error, 'error');
    }

    throw error;
  };

  return {
    get: <T>(url: string, params?: any) => apiService.get<T>(url, params).catch(handleError),

    post: <T>(url: string, data?: any) => apiService.post<T>(url, data).catch(handleError),

    put: <T>(url: string, data?: any) => apiService.put<T>(url, data).catch(handleError),

    delete: <T>(url: string) => apiService.delete<T>(url).catch(handleError),

    postFormData: <T>(url: string, formData: FormData) =>
      apiService.postFormData<T>(url, formData).catch(handleError),

    getBlob: (url: string) => apiService.getBlob(url).catch(handleError),
  };
}
