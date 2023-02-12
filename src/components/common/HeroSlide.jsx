import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { GenreApi, MediaApi } from "api/modules";
import { toast } from "react-toastify";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { PlayArrow as PlayArrowIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { routeGen } from "routes";
import UI_CONFIGS from "configs/ui.configs";
import tmdbConfigs from "api/configs/tmdb.configs";
import CircularRate from "./CircularRate";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleGetMediaList = async () => {
    const { response, error } = await MediaApi.getList({
      mediaType,
      mediaCategory,
      page: 1,
    });
    if (response) setMovies(response.results);
    if (error) toast.error(error.message);
    dispatch(setGlobalLoading(false));
  };

  const handleGetGenres = async () => {
    dispatch(setGlobalLoading(true));

    const { response, error } = await GenreApi.getList({
      mediaType,
    });
    if (response) {
      setGenres(response.genres);
      await handleGetMediaList();
    }
    if (error) toast.error(error.message);
    dispatch(setGlobalLoading(false));
  };

  useEffect(() => {
    handleGetGenres();
  }, [dispatch, mediaType, mediaCategory]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "0",
          bottom: "0",
          width: "100%",
          height: "30%",
          zIndex: 2,
          pointerEvents: "none",
          ...UI_CONFIGS.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        style={{ width: "100%", height: "max-content" }}
        loop={true}
        modules={[Autoplay]}
        grabCursor={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...UI_CONFIGS.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{
                      ...UI_CONFIGS.style.typoLines(2, "left"),
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CircularRate value={movie.vote_average} />
                    <Divider orientation="vertical" />
                    <>
                      {[...movie.genre_ids]
                        .splice(0, 2)
                        .map((genreId, index) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            key={index}
                            label={
                              genres &&
                              genres.find((item) => item.id === genreId) &&
                              genres &&
                              genres.find((item) => item.id === genreId).name
                            }
                          />
                        ))}
                    </>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      ...UI_CONFIGS.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    LinkComponent={Link}
                    to={routeGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: "max-content" }}
                  >
                    Watch now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
