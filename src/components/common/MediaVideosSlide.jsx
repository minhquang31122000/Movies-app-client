import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { NavigationSwiper } from ".";
import tmdbConfigs from "api/configs/tmdb.configs";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <Box sx={{ height: "max-content" }}>
      <Box
        component="iframe"
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        style={{ border: 0 }}
      />
    </Box>
  );
};

const MediaVideosSlide = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
