import React from "react";
import { AppContainer, HeroSlide, MediaSlide } from "components/common";
import { Box } from "@mui/material";
import tmdbConfigs from "api/configs/tmdb.configs";
import UI_CONFIGS from "configs/ui.configs";

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box marginTop="-4rem" sx={{ ...UI_CONFIGS.style.mainContent }}>
        <AppContainer header="popular movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </AppContainer>

        <AppContainer header="popular series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </AppContainer>

        <AppContainer header="top rated movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </AppContainer>

        <AppContainer header="top rated series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </AppContainer>
      </Box>
    </>
  );
};

export default HomePage;
