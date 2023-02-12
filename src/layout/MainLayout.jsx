import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AuthModal, Footer, GlobalLoading, TopBar } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "redux/features/themeModeSlice";
import { THEME_MODE } from "configs/theme.configs";
import { UserApi } from "api/modules";
import { setUser } from "redux/features/userSlice";
import { AppConstants } from "const";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleGetUserInfo = async () => {
    const { response, error } = await UserApi.getInfo();
    console.log("response", response);
    console.log("error", error);

    if (response) dispatch(setUser(response));

    if (error) dispatch(setUser(null));
  };

  useEffect(() => {
    if(window.localStorage.getItem(AppConstants.TOKEN_STORAGE)){
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
