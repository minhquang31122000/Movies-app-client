import React from "react";
import tmdbConfigs from "api/configs/tmdb.configs";
import { SwiperSlide } from "swiper/react";
import { NavigationSwiper } from ".";
import { Box } from "@mui/material";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {backdrops &&
        [...backdrops].splice(0, 10).map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: "60%",
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  item.file_path
                )})`,
              }}
            />
          </SwiperSlide>
        ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
