export interface PaginationResponse<T = any> {
  totalData: number;
  datas: T[];
}
