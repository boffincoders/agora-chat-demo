import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatServices from "../../services";

const initialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};
export const verifyOtp: any = createAsyncThunk(
  "verifyOtp",
  async (data: { email: string; otp: number }) => {
    const response = await chatServices.verifyOtp(data);
    return response.data;
  }
);

const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default verifyOtpSlice.reducer;
