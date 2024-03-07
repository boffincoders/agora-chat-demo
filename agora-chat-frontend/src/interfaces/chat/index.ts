export interface ISingleUserChatRecord {
  timestamp: string | number | Date;
  _id: string;
  message: string;
  sent_from: string;
  sent_to: string;
  isReaded: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface ISingleUserChatData {
  perPage: number;
  pageNo: number;
  isLastDoc: boolean;
  data: ISingleUserChatRecord[];
}
