import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  globalSearchNeeded: false
};

const searchSlice = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchValue = action.payload.searchValue;
      state.globalSearchNeeded = action.payload.globalSearchNeeded;
    },
  },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
