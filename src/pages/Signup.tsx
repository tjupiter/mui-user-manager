import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// mui
import {
  Card,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { Iconify, RHFTextField } from "../components";
// form: YUP + RHF
import { object, ref, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// context + providers
import FormProvider from "../contexts-providers/FormProvider";
import { useUserAuth } from "../contexts-providers/UserAuthContext";
// type
import { LoginDetails } from "../types";
import { FirebaseError } from "firebase/app";

export default function Signup() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user, signUp } = useUserAuth();

  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = object().shape({
    username: string().email().required("Username is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password has to be at least 6 characters"),
    retypePassword: string()
      .required("Please retype your password.")
      .oneOf([ref("password")], "Your passwords do not match."),
  });

  const methods = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: { username: "", password: "", retypePassword: "" },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ===================================
  //               SUBMIT
  // ===================================

  const onSubmit = async (data: LoginDetails) => {
    try {
      await signUp(data.username, data.password);
      enqueueSnackbar("Successfully signed up");
      navigate("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`${(error as FirebaseError).message}`, {
        variant: "error",
      });
    }
  };

  const onError = (error: unknown) => console.error(error);

  // ===================================

  return (
    <>
      {user ? (
        <Navigate to='/user-management' />
      ) : (
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{ height: "100vh" }}
            spacing={2}
          >
            <Card sx={{ width: "30%", maxWidth: 400, p: 5 }}>
              <Stack direction='column' spacing={4}>
                <Stack direction='column'>
                  <Typography
                    fontWeight={700}
                    fontSize={40}
                    textAlign={"center"}
                  >
                    Sign up
                  </Typography>
                  <Typography textAlign='center' variant='subtitle2'>
                    to MUI User Management
                  </Typography>
                </Stack>
                <Stack direction='column' spacing={2}>
                  <RHFTextField
                    name='username'
                    label='Email'
                    autoComplete='email'
                    id='email'
                  />
                  <RHFTextField
                    name='password'
                    type={!showPassword ? "password" : "text"}
                    label='Password'
                    autoComplete='new-password'
                    id='new-password'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            ></Iconify>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <RHFTextField
                    name='retypePassword'
                    type={!showPassword ? "password" : "text"}
                    label='Re-type password'
                    autoComplete='new-password'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "eva:eye-fill"
                                  : "eva:eye-off-fill"
                              }
                            ></Iconify>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
                <LoadingButton
                  type='submit'
                  variant='outlined'
                  sx={{ width: "60%", alignSelf: "center", mt: 4 }}
                  loading={isSubmitting}
                >
                  Sign up
                </LoadingButton>
              </Stack>
            </Card>
            <Card
              sx={{
                width: "30%",
                maxWidth: 400,
                py: 2,
                px: 5,
                textAlign: "center",
              }}
            >
              <Link
                component={Typography}
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
              >
                Already registered?
              </Link>{" "}
            </Card>
          </Stack>
        </FormProvider>
      )}
    </>
  );
}
