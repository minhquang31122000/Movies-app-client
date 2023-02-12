import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { LogoIcon } from "components/Icons";

const GlobalLoading = () => {
  const isShowGlobalLoading = useSelector((state) => state.isShowGlobalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isShowGlobalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [isShowGlobalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transitions: "all 0.3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <LogoIcon />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
