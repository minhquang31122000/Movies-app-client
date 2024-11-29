import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserApi } from "api/modules";
import { toast } from "react-toastify";
import { setUser } from "redux/features/userSlice";
import { setAuthModalOpen } from "redux/features/authModalSlice";
import { Box, Stack, TextField } from "@mui/material";
import UI_CONFIGS from "configs/ui.configs";
import { AppContainer } from "components/common";
import { LoadingButton } from "@mui/lab";

const PasswordUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      newPassword: Yup.string()
        .min(8, "newPassword minimum 8 characters")
        .required("newPassword is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "confirmNewPassword not match")
        .min(8, "confirmNewPassword minimum 8 characters")
        .required("confirmNewPassword is required"),
    }),
    onSubmit: async (values) => handleUpdatePassword(values),
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleUpdatePassword = async (values) => {
    if (isFetching) return;

    setIsFetching(true);
    const { response, error } = await UserApi.passwordUpdate(values);
    setIsFetching(false);

    if (error) toast.error(error.message);
    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success("Update password successfully! Please re-login");
    }
  };

  return (
    <Box sx={{ ...UI_CONFIGS.style.mainContent }}>
      <AppContainer header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="New password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder=" Confirm new password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={isFetching}
            >
              Update password
            </LoadingButton>
          </Stack>
        </Box>
      </AppContainer>
    </Box>
  );
};

export default PasswordUpdate;
