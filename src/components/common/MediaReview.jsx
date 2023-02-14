import React, { useEffect, useState } from "react";
import {
  Delete as DeleteIcon,
  SendOutlined as SendOutlinedIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReviewApi } from "api/modules";
import { AppContainer, TextAvatar } from ".";
import dayjs from "dayjs";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [isFetching, setIsFetching] = useState(false);

  const handleRemove = async () => {
    if (isFetching) return;

    setIsFetching(true);

    const { response, error } = await ReviewApi.remove({
      reviewId: review._id,
    });
    setIsFetching(false);
    if (error) toast.error(error.message);
    if (response) onRemoved(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: isFetching ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        <Stack spacing={2} flexGrow={1}>
          <TextAvatar text={review.user.displayName} />
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={isFetching}
              onClick={handleRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              Remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const skip = 4;

  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const handleAddReview = async () => {
    if (isFetching) return;
    setIsFetching(true);

    const params = {
      content,
      mediaType,
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, error } = await ReviewApi.add(params);

    setIsFetching(false);
    if (error) toast.error(error.message);
    if (response) {
      toast.success("Post review successfully");
      setFilteredReviews([...filteredReviews, response]);
      setListReviews([...listReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const handleLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip),
      skip,
    ]);
    setPage(page + 1);
  };

  const handleRemoved = (id) => {
    if (listReviews.findIndex((item) => item._id === id) !== -1) {
      const newListReviews = [...listReviews].filter((item) => item._id !== id);

      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews(
        [...filteredReviews].filter((item) => item._id !== id)
      );
    }

    setReviewCount(reviewCount - 1);

    toast.success("Remove review successfully");
  };

  useEffect(() => {
    if (!reviews) return;

    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  return (
    <>
      <AppContainer header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => (
            <Box key={item._id}>
              <ReviewItem
                review={item}
                onRemoved={() => handleRemoved(item._id)}
              />
              <Divider sx={{ display: { xs: "block", md: "none" } }} />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={handleLoadMore}>Load more</Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={isFetching}
                  onClick={handleAddReview}
                >
                  Post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </AppContainer>
    </>
  );
};

export default MediaReview;
