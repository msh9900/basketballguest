import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userid: '',
  pw: '',
  email: '',
  userImg: '',
  defaultImgUrl:
    'https://blog.kakaocdn.net/dn/EtXLd/btrcf61KuuI/luhp9I8a1nfwUwQ4MwSTQk/img.jpg',
  userName: '',
  islogin: false,
};
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    IsRegister: (state, action) => {
      state.userid = action.payload.id;
      state.pw = action.payload.pw;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.userName = action.payload.userName;
      state.islogin = false;
    },
  },
});

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    IsLogin: (state, action) => {
      state.userid = action.payload.id;
      state.pw = action.payload.pw;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.userName = action.payload.userName;
      state.islogin = true;
    },
  },
});

export const { userid } = initialState;
export const { IsLogin } = loginSlice.actions;
export const { IsRegister } = registerSlice.actions;

export default loginSlice.reducer;
