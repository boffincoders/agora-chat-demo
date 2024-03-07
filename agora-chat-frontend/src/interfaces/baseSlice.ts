export interface ISliceBaseResponse {
  type: string;
  payload: ISlicePayload;
  meta: Meta;
}

export interface Meta {
  requestId: string;
  requestStatus: string;
}

export interface ISlicePayload {
  success: boolean;
  statusCode: number;
  data?: any;
}
