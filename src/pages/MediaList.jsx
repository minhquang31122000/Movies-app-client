import React, { useEffect, useState } from "react";
import usePrevious from "hooks/userPrevious";
import MediaGrid from "components/common/MediaGrid";
import UI_CONFIGS from "configs/ui.configs";
import tmdbConfigs from "api/configs/tmdb.configs";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { MediaApi } from "api/modules";
import { HeroSlide } from "components/common";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setAppState } from "redux/features/appStateSlice";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";

const MediaList = () => {
  const { mediaType } = useParams();
  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const prevMediaType = usePrevious(mediaType);

  const mediaCategories = ["popular", "top_rated"];
  const category = ["popular", "top rated"];

  const getMedias = async () => {
    if (currentPage === 1) dispatch(setGlobalLoading(true));
    setMediaLoading(true);

    const { response, error } = await MediaApi.getList({
      mediaType,
      mediaCategory: mediaCategories[currentCategory],
      page: currentPage,
    });

    dispatch(setGlobalLoading(false));
    setMediaLoading(false);

    if (error) toast.error(error.message);
    if (response) {
      if (currentPage !== 1)
        setMedias((item) => [...item, ...response.results]);
      else setMedias([...response.results]);
    }
  };

  const handleChangeCategory = (index) => {
    if (currentCategory === index) return;

    setMedias([]);
    setCurrentPage(1);
    setCurrentCategory(index);
  };

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);

    if (mediaType !== prevMediaType) {
      setCurrentPage(1);
      setCurrentCategory(0);
    }
  }, [mediaType, dispatch]);

  useEffect(() => {
    getMedias();
  }, [mediaType, prevMediaType, currentCategory, currentPage, dispatch]);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...UI_CONFIGS.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie
              ? "Movies"
              : "Tv Servies"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currentCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currentCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => handleChangeCategory(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={handleLoadMore}
        >
          Load More
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
