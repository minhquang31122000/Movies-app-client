import React, { useCallback, useEffect, useState } from "react";
import { MediaApi } from "api/modules";
import { toast } from "react-toastify";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import UI_CONFIGS from "configs/ui.configs";
import MediaGrid from "components/common/MediaGrid";
import { LoadingButton } from "@mui/lab";

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [mediaType, setMediaType] = useState(MEDIA_TYPE[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const handleSearch = useCallback(async () => {
    setIsFetching(true);

    const { response, error } = await MediaApi.search({
      mediaType,
      query,
      page,
    });
    setIsFetching(false);

    if (error) toast.error(error.message);
    if (response) {
      if (page > 1) setMedias((item) => [...item, ...response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, query, page]);

  const handleChangeCategory = (value) => {
    setMediaType(value);
  };

  const handleChangeQuery = (value) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(value);
    }, TIMEOUT);
  };

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else handleSearch();
  }, [query, handleSearch, mediaType]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  return (
    <>
      <Toolbar />
      <Box sx={{ ...UI_CONFIGS.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {MEDIA_TYPE.map((item, index) => (
              <Button
                key={index}
                size="large"
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => handleChangeCategory(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          <TextField
            color="success"
            placeholder="Search MoonFlix"
            sx={{ width: "100%" }}
            autoFocus
            onChange={(e) => handleChangeQuery(e.target.value)}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />
          {medias.length > 0 && (
            <LoadingButton
              loading={isFetching}
              onClick={() => setPage(page + 1)}
            >
              Load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;

const MEDIA_TYPE = ["movie", "tv", "people"];
const TIMEOUT = 500;
let timer;
