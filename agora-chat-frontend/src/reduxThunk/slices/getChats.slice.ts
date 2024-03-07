import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { IPagination } from "../../interfaces/base";
import { IGetUserResponse } from "../../interfaces/user/getUser.reponse";
import chatServices from "../../services";

interface IInitialState {
  status: string;
  entities: any;
  isLoading: boolean;
  data: any;
  isError: boolean;
}
const initialState: IInitialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};

export const getChats: AsyncThunk<any, void, AsyncThunkConfig> | any =
  createAsyncThunk(
    "getChats",
    async (data: { id: string; pagination: IPagination }) => {
      const { id, pagination } = data;
      const response: IGetUserResponse = await chatServices.getChatWithUser(
        id,
        pagination
      );
      return response.data;
    }
  );

const getChatsSlice = createSlice({
  name: "getChats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getChats.rejected, (state: any, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});

export default getChatsSlice.reducer;
