import React from "react";
import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  WbSunnyOutlined as WbSunnyOutlinedIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UI_CONFIGS from "configs/ui.configs";
import { THEME_MODE } from "configs/theme.configs";
import { setThemeMode } from "redux/features/themeModeSlice";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { LogoIcon } from "components/Icons";
import { Link } from "react-router-dom";
import MENU_CONFIGS from "configs/menu.config";

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = UI_CONFIGS.size.sidebarWidth;

  const handleSwitchTheme = () => {
    const theme =
      themeMode === THEME_MODE.dark ? THEME_MODE.light : THEME_MODE.dark;

    dispatch(setThemeMode(theme));
    window.localStorage.setItem("theme", theme);
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <LogoIcon />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {MENU_CONFIGS.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            LinkComponent={Link}
            to={item.path}
            onClick={() => onToggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {MENU_CONFIGS.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                LinkComponent={Link}
                top={item.path}
                onClick={() => onToggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={handleSwitchTheme}>
          <ListItemIcon>
            {themeMode === THEME_MODE.dark && <DarkModeOutlinedIcon />}
            {themeMode === THEME_MODE.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === THEME_MODE.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={isOpen}
      onClose={() => onToggleSidebar(false)}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
