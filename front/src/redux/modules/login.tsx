import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  email: '',
  userImg: '',
  defaultImgUrl:
    'https://blog.kakaocdn.net/dn/EtXLd/btrcf61KuuI/luhp9I8a1nfwUwQ4MwSTQk/img.jpg',
  userName: '',
  islogin: false,
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
      state.islogin = true;
    },
  },
});

export const { userId } = initialState;
export const { IsLogin } = loginSlice.actions;

export default loginSlice.reducer;
