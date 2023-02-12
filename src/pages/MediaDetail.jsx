import React, { useEffect, useRef, useState } from "react";
import {
  Favorite as FavoriteIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { FavoriteApi, MediaApi } from "api/modules";
import { toast } from "react-toastify";
import {
  AppContainer,
  CastSlide,
  CircularRate,
  ImageHeader,
  MediaVideosSlide,
} from "components/common";
import tmdbConfigs from "api/configs/tmdb.configs";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "redux/features/userSlice";
import UI_CONFIGS from "configs/ui.configs";

const MediaDetail = () => {
  const dispatch = useDispatch();
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);

  const videoRef = useRef(null);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (isFetching) return;
    if (isFavorite) {
      await handleRemoveFavorite();
      return;
    }

    setIsFetching(true);
    const params = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await FavoriteApi.add(params);
    setIsFetching(false);
    if (error) toast.error(error.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const handleGetMedia = async () => {
    dispatch(setGlobalLoading(true));

    const { response, error } = await MediaApi.getDetail({
      mediaType,
      mediaId,
    });
    dispatch(setGlobalLoading(true));
    if (response) {
      setMedia(response);
      setIsFavorite(response.isFavorite);
      setGenres(response.genres.splice(0, 2));
    }

    if (error) toast.error(error.message);
  };

  const handleRemoveFavorite = async () => {
    if (isFetching) return;
    setIsFetching(true);

    const favorite = listFavorites.find(
      (item) => item.mediaId.toString() === media.id.toString()
    );

    const { response, error } = await FavoriteApi.remove({
      favoriteId: favorite._id,
    });

    setIsFetching(false);

    if (error) toast.error(error.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite successfully");
    }
  };

  useEffect(() => {
    handleGetMedia();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <>
      <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path)} />
      <Box
        sx={{ color: "primary.contrastText", ...UI_CONFIGS.style.mainContent }}
      >
        <Box
          sx={{
            marginTop: {
              xs: "-10rem",
              md: "-15rem",
              lg: "-20rem",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...UI_CONFIGS.style.backgroundImage(
                    media.poster_path
                      ? tmdbConfigs.posterPath(media.poster_path)
                      : tmdbConfigs.backdropPath(media.backdrop_path)
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "3rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...UI_CONFIGS.style.typoLines(2, "left") }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split("-")[0]
                      : media.first_air_date.split("-")[0]
                  }`}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularRate value={media.vote_average} />
                  <Divider orientation="vertical" />
                  {genres.map((genre, index) => (
                    <Chip
                      key={index}
                      label={genre.name}
                      variant="filled"
                      color="primary"
                    />
                  ))}
                </Stack>

                <Typography
                  variant="body1"
                  sx={{
                    ...UI_CONFIGS.style.typoLines(5),
                  }}
                >
                  {media.overview}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: 0 },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loading={isFetching}
                    onClick={handleFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    Watch now
                  </Button>
                </Stack>

                {/* cast */}
                <AppContainer header="Cast">
                  <CastSlide casts={media.credits.cast} />
                </AppContainer>
                {/* cast */}
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* Media videos */}
        <Box ref={videoRef} style={{ paddingTop: "2rem" }}>
          <AppContainer header="Videos">
            <MediaVideosSlide videos={media.videos.splice(0, 5)} />
          </AppContainer>
        </Box>
        {/* Media videos */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
