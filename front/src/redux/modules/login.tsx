import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pw: '',
  islogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    IsLogin: (state, action) => {
      state.id = action.payload.id;
      state.pw = action.payload.pw;
      state.islogin = true;
    },
  },
});

export const { IsLogin } = loginSlice.actions;
export default loginSlice.reducer;
