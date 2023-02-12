import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import userApi from "api/modules/user.api";
import * as Yup from "yup";

const SigninForm = ({ onSwitchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      setIsLoginRequest(true);
      const { response, error } = await userApi.signin(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in successfully");
      }

      if (error) {
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <>
      <Box component="form" onSubmit={signinForm.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            type="text"
            placeholder="username"
            name="username"
            fullWidth
            value={signinForm.values.username}
            onChange={signinForm.handleChange}
            color="success"
            error={
              signinForm.touched.username &&
              signinForm.errors.username !== undefined
            }
            helperText={
              signinForm.touched.username && signinForm.errors.username
            }
          />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            fullWidth
            value={signinForm.values.password}
            onChange={signinForm.handleChange}
            color="success"
            error={
              signinForm.touched.password &&
              signinForm.errors.password !== undefined
            }
            helperText={
              signinForm.touched.password && signinForm.errors.password
            }
          />
        </Stack>

        <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
        >
          Sign in
        </LoadingButton>
        <Button fullWidth sx={{ marginTop: 1 }} onClick={onSwitchAuthState}>
          Sign up
        </Button>
        {errorMessage && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SigninForm;
