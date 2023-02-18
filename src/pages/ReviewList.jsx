import React, { useEffect, useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ReviewApi } from "api/modules";
import { toast } from "react-toastify";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routeGen } from "routes";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { AppContainer } from "components/common";
import UI_CONFIGS from "configs/ui.configs";
import tmdbConfigs from "api/configs/tmdb.configs";
import dayjs from "dayjs";

const ReviewItem = ({ review, onRemoved }) => {
  // const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const handleRemove = async () => {
    if (isFetching) return;

    setIsFetching(true);
    const { response, error } = await ReviewApi.remove({
      reviewId: review.id,
    });
    setIsFetching(false);

    if (error) toast.error(error.message);
    if (response) {
      toast.success("Removed favorite successfully!");
      onRemoved(review.id);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: isFetching ? "0.6" : "1",
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routeGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
              ...UI_CONFIGS.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routeGen.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{ ...UI_CONFIGS.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={isFetching}
        onClick={handleRemove}
      >
        Remove
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const skip = 8;

  const handleGetReviews = async () => {
    dispatch(setGlobalLoading(true));
    const { response, error } = await ReviewApi.getList();
    dispatch(setGlobalLoading(false));

    if (error) toast.error(error.message);
    if (response) {
      const refactorResponse = response.map((item) => ({
        ...item,
        id: item._id,
      }));
      setCount(refactorResponse.length);
      setReviews([...refactorResponse]);
      setFilteredReviews([...refactorResponse].splice(0, skip));
    }
  };

  const handleLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ]);
    setPage((prev) => prev + 1);
  };

  const handleRemoved = (id) => {
    const newReviews = [...reviews].filter((item) => item.id !== id);
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, page * skip));
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    handleGetReviews();
  }, [dispatch]);

  return (
    <Box
      sx={{
        ...UI_CONFIGS.style.mainContent,
      }}
    >
      <AppContainer header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={handleRemoved} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={handleLoadMore}>Load more</Button>
          )}
        </Stack>
      </AppContainer>
    </Box>
  );
};

export default ReviewList;
