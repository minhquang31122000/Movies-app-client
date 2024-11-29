import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AuthModal, Footer, GlobalLoading, TopBar } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "redux/features/themeModeSlice";
import { THEME_MODE } from "configs/theme.configs";
import { FavoriteApi, UserApi } from "api/modules";
import { setListFavorites, setUser } from "redux/features/userSlice";
import { AppConstants } from "const";
import { toast } from "react-toastify";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleGetUserInfo = async () => {
    const { response, error } = await UserApi.getInfo();

    if (response) dispatch(setUser(response));

    if (error) dispatch(setUser(null));
  };

  const handleGetFavorites = async () => {
    const { response, error } = await FavoriteApi.getList();

    if (response) dispatch(setListFavorites(response));
    if (error) toast.error(error.message);
  };

  useEffect(() => {
    if (window.localStorage.getItem(AppConstants.TOKEN_STORAGE)) {
      handleGetUserInfo();
    }
  }, [dispatch]);

  useEffect(() => {
    const themeLocal = localStorage.getItem("theme");
    if (!themeLocal) return;

    dispatch(
      setThemeMode(
        themeLocal === THEME_MODE.dark ? themeLocal : THEME_MODE.light
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (Boolean(user)) {
      handleGetFavorites();
    } else {
      dispatch(setListFavorites([]));
    }
  }, [dispatch, user]);

  return (
    <>
      <GlobalLoading />
      {/* Login modal*/}
      <AuthModal />
      {/* Login modal*/}

      <Box flex minHeight="100vh">
        {/* Header*/}
        <TopBar />
        {/* Header*/}

        {/* Main*/}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* Main*/}

        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
