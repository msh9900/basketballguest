import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  email: "",
  userImg: "",
  defaultImgUrl:
    "https://blog.kakaocdn.net/dn/EtXLd/btrcf61KuuI/luhp9I8a1nfwUwQ4MwSTQk/img.jpg",
  userName: "",
  isLogin: false,
};

const AuthSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    IsLogin: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.userName = action.payload.userName;
      state.isLogin = true;
    },
    IsLogout: (state) => {
      state.userId = "";
      state.email = "";
      state.userImg = "";
      state.userName = "";
      state.isLogin = false;
    },
  },
});

export const { userId } = initialState;
export const { IsLogin } = AuthSlice.actions;
export const { IsLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
