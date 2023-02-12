const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((item) => item.mediaId.toString() !== undefined),
};

export default favoriteUtils;
