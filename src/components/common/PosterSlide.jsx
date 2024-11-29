import React from "react";
import tmdbConfigs from "api/configs/tmdb.configs";
import { SwiperSlide } from "swiper/react";
import { AutoSwiper } from ".";
import { Box } from "@mui/material";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {posters &&
        [...posters].splice(0, 10).map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: "60%",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.posterPath(
                  item.file_path
                )})`,
              }}
            />
          </SwiperSlide>
        ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
