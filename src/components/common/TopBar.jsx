import React, { cloneElement, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THEME_MODE } from "configs/theme.configs";
import { setThemeMode } from "redux/features/themeModeSlice";
import { LogoIcon } from "components/Icons";
import { Link } from "react-router-dom";
import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  WbSunnyOutlined as WbSunnyOutlinedIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MENU_CONFIGS from "configs/menu.config";
import UserMenu from "./UserMenu";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { Sidebar } from ".";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === THEME_MODE.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === THEME_MODE.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const TopBar = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleSwitchTheme = () => {
    const theme =
      themeMode === THEME_MODE.dark ? THEME_MODE.light : THEME_MODE.dark;

    dispatch(setThemeMode(theme));
    window.localStorage.setItem("theme", theme);
  };

  return (
    <>
      <Sidebar
        isOpen={isOpenSidebar}
        onToggleSidebar={() => setIsOpenSidebar(!isOpenSidebar)}
      />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={() => setIsOpenSidebar(!isOpenSidebar)}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <LogoIcon />
              </Box>
            </Stack>

            {/*  Main Menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <LogoIcon />
              </Box>
              {MENU_CONFIGS.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    mr: 2,
                    color: appState.includes(item.state)
                      ? "primary.contrastText"
                      : "inherit",
                  }}
                  LinkComponent={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? "contained" : "text"}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={handleSwitchTheme}>
                {themeMode === THEME_MODE.dark && <DarkModeOutlinedIcon />}
                {themeMode === THEME_MODE.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/*  Main Menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default TopBar;
