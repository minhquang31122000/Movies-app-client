import { Box, useTheme } from "@mui/material";
import UI_CONFIGS from "configs/ui.configs";
import React from "react";

const ImageHeader = ({ imgPath }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: "-1",
        position: "relative",
        paddingTop: { xs: "60%", sm: "40%", md: "35%" },
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgPath})`,
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          ...UI_CONFIGS.style.gradientBgImage[theme.palette.mode],
        },
      }}
    ></Box>
  );
};

export default ImageHeader;
