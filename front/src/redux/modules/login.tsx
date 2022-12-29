import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  islogin: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    IsLogin: (state) => {
      state.islogin = true;
    },
  },
});

export const { IsLogin } = loginSlice.actions;
export default loginSlice.reducer;
