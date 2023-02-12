import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "GlobalLoading",
  initialState: {
    isShowGlobalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isShowGlobalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
