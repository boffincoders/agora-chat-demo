import {  createSlice } from "@reduxjs/toolkit";


const initialState: any = {
  connection: null,
};

const connectionApp = createSlice({
  name: "connectionApp",
  initialState,
  reducers: {
    addConnection: (state, action) => {     
    state.connection=action.payload
    },
  },
});
export const { addConnection } = connectionApp.actions;

export default connectionApp.reducer;
