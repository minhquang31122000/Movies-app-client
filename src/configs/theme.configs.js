import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const THEME_MODE = {
  dark: "dark",
  light: "light",
};

const THEME_CONFIGS = {
  custom: ({ mode }) => {
    const customPalette =
      mode === THEME_MODE.dark
        ? {
            primary: {
              main: "#ff0000",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
            text: {
              white: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
              paper: "#ffffff",
            },
            text: {
              white: "#ffffff",
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default THEME_CONFIGS;
