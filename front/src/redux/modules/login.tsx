import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  email: '',
  userImg: '',
  defaultImgUrl:
    'https://blog.kakaocdn.net/dn/EtXLd/btrcf61KuuI/luhp9I8a1nfwUwQ4MwSTQk/img.jpg',
  userName: '',
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    IsLogin: (state, action) => {
      state.userId = action.payload.id;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.userName = action.payload.userName;
      state.isLogin = true;
      const userString = JSON.stringify(loginSlice);
      window.localStorage.setItem('user', userString);
    },
    IsLogout: (state) => {
      state.isLogin = false;
      window.localStorage.removeItem('user');
    },
  },
});

export const { userId } = initialState;
export const { IsLogin } = loginSlice.actions;
export const { IsLogout } = loginSlice.actions;

export default loginSlice.reducer;
