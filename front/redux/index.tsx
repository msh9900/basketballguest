import login from "./modules/login";
import search from "./modules/search";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { login, search },
});
export default store;
