import React, { useEffect } from "react";
import { AppConstants } from "const";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "redux/features/authModalSlice";

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = window.localStorage.getItem(AppConstants.TOKEN_STORAGE);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user && !token));
  }, [token, user, dispatch]);

  return <>{user ? children : null}</>;
};

export default ProtectedPage;
