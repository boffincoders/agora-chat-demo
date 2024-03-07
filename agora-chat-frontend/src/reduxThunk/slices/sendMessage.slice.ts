import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import chatServices from "../../services";

// omit imports and state
const initialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};
export const sendMessage: AsyncThunk<any, void, AsyncThunkConfig> | any =
  createAsyncThunk(
    "sendMessage",
    async (data: { sent_to: string; message: string }) => {
      const response = await chatServices.sendMessage(data);
      return response;
    }
  );

const sendMessageSlice = createSlice({
  name: "sendMessage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default sendMessageSlice.reducer;
