import React from "react";
import { Typography, useTheme } from "@mui/material";

const LogoIcon = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Moon <span style={{ color: theme.palette.primary.main }}>Flix</span>
    </Typography>
  );
};

export default LogoIcon;
