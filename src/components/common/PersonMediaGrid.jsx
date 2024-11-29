import React, { useEffect, useState } from "react";
import tmdbConfigs from "api/configs/tmdb.configs";
import { Button, Grid } from "@mui/material";
import { PersonApi } from "api/modules";
import { toast } from "react-toastify";
import { MediaItem } from ".";

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  const handleMedias = async () => {
    const { response, error } = await PersonApi.medias({ personId });
    if (error) toast.error(error.message);
    if (response) {
      const responseData =
        response.cast.length > 0 ? response.cast : response.crew;
      const mediasSorted = responseData.sort(
        (a, b) => handleGetReleaseDate(b) - handleGetReleaseDate(a)
      );
      setMedias([...mediasSorted]);
      setFilteredMedias([...mediasSorted].splice(0, skip));
    }
  };

  const handleGetReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);

    return date.getTime();
  };

  const handleLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    handleMedias();
  }, [personId]);

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
        {filteredMedias &&
          filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <MediaItem media={media} mediaType={media.media_type} />
            </Grid>
          ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
