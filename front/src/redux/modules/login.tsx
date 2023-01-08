import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userid: '',
  pw: '',
  email: '',
  userImg: '',
  userName: '',

  islogin: false,
};

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

export default loginSlice.reducer;
