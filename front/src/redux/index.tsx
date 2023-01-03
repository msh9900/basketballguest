import counter from '../redux/modules/counterSlice';
import login from './modules/login';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { login },
});
export default store;
