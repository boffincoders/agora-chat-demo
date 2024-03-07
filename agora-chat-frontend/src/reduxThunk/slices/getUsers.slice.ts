import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AsyncThunk,
  AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { IGetUserResponse } from "../../interfaces/user/getUser.reponse";
import chatServices from "../../services";

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
export const getUsers: AsyncThunk<any, void, AsyncThunkConfig> | any =
  createAsyncThunk("getUsers", async (id?: string) => {
    const response: IGetUserResponse = await chatServices.getUsers(id);
    return response.data;
  });

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state: any, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default getUsersSlice.reducer;
