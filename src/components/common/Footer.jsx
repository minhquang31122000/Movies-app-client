import React from "react";
import { Box, Button, Paper, Stack } from "@mui/material";
import { LogoIcon } from "components/Icons";
import { AppContainer } from ".";
import { Link } from "react-router-dom";
import MENU_CONFIGS from "configs/menu.config";

const Footer = () => {
  return (
    <AppContainer>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          padding: "2rem",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <LogoIcon />
          <Box>
            {MENU_CONFIGS.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                LinkComponent={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </AppContainer>
  );
};

export default Footer;

