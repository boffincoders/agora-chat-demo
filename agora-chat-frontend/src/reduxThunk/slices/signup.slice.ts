import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatServices from "../../services";

const initialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};
export const signup: any = createAsyncThunk(
  "signup",
  async (data: { email: string; password: any }) => {
    const response = await chatServices.signup(data);
    return response.data;
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default signupSlice.reducer;
