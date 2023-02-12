import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "AuthModal",
  initialState: {
    isOpenAuthModal: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.isOpenAuthModal = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export default authModalSlice.reducer;
