import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { LogoIcon } from "components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { SignupForm } from ".";
import SigninForm from "./SigninForm";

const AuthModal = () => {
  const { isOpenAuthModal } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(ACTION_OPTIONS.signin);

  const handleCloseAuthModal = () => dispatch(setAuthModalOpen(false));

  const handleSwitchAuthState = (state) => setAction(state);

  useEffect(() => {
    if (isOpenAuthModal) setAction(ACTION_OPTIONS.signin);
  }, [isOpenAuthModal]);

  return (
    <Modal open={isOpenAuthModal} onClose={handleCloseAuthModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <LogoIcon />
          </Box>
          {action === ACTION_OPTIONS.signin && (
            <SigninForm
              onSwitchAuthState={() =>
                handleSwitchAuthState(ACTION_OPTIONS.signup)
              }
            />
          )}
          {action === ACTION_OPTIONS.signup && (
            <SignupForm
              onSwitchAuthState={() =>
                handleSwitchAuthState(ACTION_OPTIONS.signin)
              }
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;

const ACTION_OPTIONS = {
  signin: "signin",
  signup: "signup",
};
