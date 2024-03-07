import { configureStore } from "@reduxjs/toolkit";
import chatMessagesSlice from "./slices/chatMessages.slice";
import connectionSlice from "./slices/connection.slice";
import generateChatTokenSlice from "./slices/generateToken";
import getChatsSlice from "./slices/getChats.slice";
import getLoggedInUserSlice from "./slices/getLoggedInUser.slice";
import getUsersSlice from "./slices/getUsers.slice";
import loginSlice from "./slices/login.slice";
import sendMessageSlice from "./slices/sendMessage.slice";
import signupSlice from "./slices/signup.slice";
import updateProfileSlice from "./slices/updateProfile.slice";
import verifyOtpSlice from "./slices/verifyOtp.slice";
export const store = configureStore({
  reducer: {
    signup: signupSlice,
    verifyOtp: verifyOtpSlice,
    login: loginSlice,
    updateProfile: updateProfileSlice,
    getUsers: getUsersSlice,
    sendMessage: sendMessageSlice,
    connection: connectionSlice,
    generateToken: generateChatTokenSlice,
    chatMessages: chatMessagesSlice,
    getChatMessages: getChatsSlice,
    loggedInUser: getLoggedInUserSlice,
  },
});
