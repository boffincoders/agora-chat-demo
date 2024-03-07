import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatServices from "../../services";

// omit imports and state
const initialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};
export const login: any = createAsyncThunk(
  "login",
  async (data: { email: string; password: any }) => {
    const response = await chatServices.login(data);
    return response.data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});
export default loginSlice.reducer;
