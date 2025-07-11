export interface ApiResponse<T> {
  statusCode: number;
  title: string;
  message: string;
  errorCode?: string;
  errorMessages?: string[] | null;
  time: string;
  data: T;
}
