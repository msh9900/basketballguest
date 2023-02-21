import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  email: "",
  userImg:
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2513B53E55DB206927",
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
      state.userImg =
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2513B53E55DB206927";
      state.userName = "";
      state.isLogin = false;
    },
  },
});

export const { userId } = initialState;
export const { IsLogin } = AuthSlice.actions;
export const { IsLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
