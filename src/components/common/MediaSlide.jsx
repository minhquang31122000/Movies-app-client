import mediaApi from "api/modules/media.api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import { AutoSwiper, MediaItem } from ".";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  const handleGetMedias = async () => {
    const { response, error } = await mediaApi.getList({
      mediaType,
      mediaCategory: mediaCategory,
      page: 1,
    });

    if (response) setMedias(response.results);
    if (error) toast.error(error.message);
  };

  useEffect(() => {
    handleGetMedias();
  }, [mediaType, mediaCategory]);

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

export default MediaSlide;
