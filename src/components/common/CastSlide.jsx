import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { routeGen } from "routes";
import UI_CONFIGS from "configs/ui.configs";
import tmdbConfigs from "api/configs/tmdb.configs";

const CastSlide = ({ casts }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            md: "25%",
            lg: "20.5%",
            color: "primary.contrastText",
          },
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routeGen.person(cast.id)}>
              {cast.profile_path && (
                <Box
                  sx={{
                    paddingTop: "120%",
                    color: "text.primary",
                    ...UI_CONFIGS.style.backgroundImage(
                      tmdbConfigs.posterPath(cast.profile_path)
                    ),
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "max-content",
                      bottom: 0,
                      padding: "10px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                    }}
                  >
                    <Typography
                      sx={{ ...UI_CONFIGS.style.typoLines(1, "left") }}
                    >
                      {cast.name}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
