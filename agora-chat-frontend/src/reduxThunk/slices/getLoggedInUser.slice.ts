import { createSlice } from "@reduxjs/toolkit";
let loggedInUser = localStorage.getItem("loggedInUser");
export interface ChatState {
  user: any;
}

const initialState: ChatState = {
  user: loggedInUser ? JSON.parse(loggedInUser) : null,
};

export const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedInUser } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
