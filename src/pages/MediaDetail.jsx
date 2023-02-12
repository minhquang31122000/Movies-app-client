import React, { useEffect, useRef, useState } from "react";
import {
  Favorite as FavoriteIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { MediaApi } from "api/modules";
import { toast } from "react-toastify";

const MediaDetail = () => {
  const dispatch = useDispatch();
  const { mediaType, mediaId } = useParams();
  const { user, listFavorites } = useSelector((state) => state.user);

  const videoRef = useRef(null);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [genres, setGenres] = useState([]);

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

  useEffect(() => {
    handleGetMedia();
  }, [mediaType, mediaId, dispatch]);

  return <div>MediaDetail</div>;
};

export default MediaDetail;
