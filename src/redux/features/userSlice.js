import { createSlice } from "@reduxjs/toolkit";
import { AppConstants } from "const";

export const userSlice = createSlice({
  name: "UserInfo",
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem(AppConstants.TOKEN_STORAGE);
      } else {
        if (action.payload.token)
          localStorage.setItem(
            AppConstants.TOKEN_STORAGE,
            action.payload.token
          );
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (item) => item.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, removeFavorite, addFavorite } =
  userSlice.actions;

export default userSlice.reducer;
