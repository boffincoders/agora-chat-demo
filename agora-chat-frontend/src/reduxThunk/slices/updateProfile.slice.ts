import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatServices from "../../services";

const initialState = {
  status: "pending",
  entities: {},
  isLoading: false,
  data: {},
  isError: false,
};

export const updateProfile: any = createAsyncThunk(
  "updateProfile",
  async (data: any) => {
    const response = await chatServices.updateProfile(data);
    return response.data;
  }
);
const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state, action) => {
        state.status = "pending";
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isError = action.payload;
      });
  },
});

export default updateProfileSlice.reducer;
