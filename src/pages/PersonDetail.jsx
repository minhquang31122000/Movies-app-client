import { Box, Stack, Toolbar, Typography } from "@mui/material";
import tmdbConfigs from "api/configs/tmdb.configs";
import { PersonApi } from "api/modules";
import { AppContainer } from "components/common";
import PersonMediaGrid from "components/common/PersonMediaGrid";
import UI_CONFIGS from "configs/ui.configs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";

const PersonDetail = () => {
  const dispatch = useDispatch();
  const { personId } = useParams();

  const [person, setPerson] = useState();

  const handleGetPerson = async () => {
    dispatch(setGlobalLoading(true));
    const { response, error } = await PersonApi.detail({ personId });
    dispatch(setGlobalLoading(false));

    if (error) toast.error(error.message);
    if (response) setPerson(response);
  };

  useEffect(() => {
    handleGetPerson();
  }, [personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...UI_CONFIGS.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  xs: "50%",
                  md: "20%",
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
                <Box
                  sx={{
                    width: { xs: "100%", md: "80%" },
                    padding: { xs: "1rem 0", md: "1rem 2rem" },
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h5" fontWeight="700">
                      {`${person.name} (${person.birthday?.split("-")[0]}`}
                      {person.deathday && `- ${person.deathday?.split("-")[0]}`}
                      {")"}
                    </Typography>
                    <Typography sx={{ ...UI_CONFIGS.style.typoLines(10) }}>
                      {person.biography}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <AppContainer header="medias">
              <PersonMediaGrid personId={personId} />
            </AppContainer>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
