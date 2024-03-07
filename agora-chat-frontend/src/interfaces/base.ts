export interface IBaseResponse {
  statusCode: number;
  success: boolean;
  data?: any;
}
export interface IPagination {
  perPage: number;
  pageNo: number;
}
