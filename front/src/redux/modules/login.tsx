import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: { id: "", Islogin: false },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    IsLogin(state) {
      state.login.Islogin = true;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
