import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { IGetUserResponse } from "../../interfaces/user/getUser.reponse";
import chatServices from "../../services";
import { HttpStatusCode } from "axios";

// omit imports and state
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
export const generateChatToken: AsyncThunk<any, void, AsyncThunkConfig> | any =
  createAsyncThunk("generateChatToken", async (id: string) => {
    if (id) {
      const response = await chatServices.generateChatToken(id);
      if (response.statusCode === HttpStatusCode.Ok) return response;
    }
  });
const generateChatTokenSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateChatToken.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(generateChatToken.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(generateChatToken.rejected, (state: any, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default generateChatTokenSlice.reducer;
