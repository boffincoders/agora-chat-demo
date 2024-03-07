import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  chats: {}
}

const initialState: ChatState = {
  chats: [],
};

export const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    updateChats: (state, action) => {
      state.chats=action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateChats } =
  chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
