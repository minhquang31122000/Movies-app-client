import React, { useEffect } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { FavoriteApi } from "api/modules";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFavorite } from "redux/features/userSlice";
import { LoadingButton } from "@mui/lab";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { Box, Button, Grid } from "@mui/material";
import { AppContainer, MediaItem } from "components/common";
import UI_CONFIGS from "configs/ui.configs";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const handleRemove = async () => {
    if (isFetching) return;

    setIsFetching(true);
    const { response, error } = await FavoriteApi.remove({
      favoriteId: media.id,
    });
    setIsFetching(false);

    if (error) toast.error(error.message);
    if (response) {
      toast.success("Removed favorite successfully!");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loading={isFetching}
        onClick={handleRemove}
      >
        Remove
      </LoadingButton>
    </>
  );
};

const FavoriteList = () => {
  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const skip = 8;

  const handleGetFavorites = async () => {
    dispatch(setGlobalLoading(true));
    const { response, error } = await FavoriteApi.getList();
    dispatch(setGlobalLoading(false));

    if (error) toast.error(error.message);
    if (response) {
      const refactorResponse = response.map((item) => ({
        ...item,
        id: item._id,
      }));
      setCount(refactorResponse.length);
      setMedias([...refactorResponse]);
      setFilteredMedias([...refactorResponse].splice(0, skip));
    }
  };

  const handleLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage((prev) => prev + 1);
  };

  const handleRemoved = (id) => {
    const newMedias = [...medias].filter((item) => item.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    handleGetFavorites();
  }, [dispatch]);

  return (
    <Box
      sx={{
        ...UI_CONFIGS.style.mainContent,
      }}
    >
      <AppContainer header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
          {filteredMedias &&
            filteredMedias.map((media, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <FavoriteItem media={media} onRemoved={handleRemoved} />
              </Grid>
            ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </AppContainer>
    </Box>
  );
};

export default FavoriteList;
