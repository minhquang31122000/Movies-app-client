import React from "react";
import { SwiperSlide } from "swiper/react";
import { AutoSwiper, MediaItem } from ".";

const RecommendSlide = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias &&
        medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
