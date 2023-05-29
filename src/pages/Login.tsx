import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// mui
import {
  Box,
  Card,
  Button,
  IconButton,
  InputAdornment,
  Slide,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import { Iconify, RHFTextField } from "../components";
// context + provider
import FormProvider from "../contexts-providers/FormProvider";
import { useUserAuth } from "../contexts-providers/UserAuthContext";
// utils
import { loginDefaultValues } from "../utils";
// type
import { LoginDetails } from "../types";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const slideParentContainer = useRef(null);

  const { user, logIn } = useUserAuth();

  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ===================================
  //        YUP + REACT HOOK FORM
  // ===================================

  const loginSchema = object().shape({
    username: string().email().required("Username is required"),
    password: string().required("Password is required"),
  });

  const methods = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
  // ===================================
  //               SUBMIT
  // ===================================

  const onSubmit = async (data: LoginDetails) => {
    try {
      await logIn(data.username, data.password);
      navigate("/user-management");
    } catch (error) {
      console.error(error);
      setLoginError(true);
      enqueueSnackbar(`${(error as FirebaseError).message}`, {
        variant: "error",
      });
    }
  };

  const onError = (error: unknown) => console.error(error);

  // ===================================
  //      HANDLE RESET LOGIN VALUES
  // ===================================

  const resetLoginValues = () => {
    reset(loginDefaultValues);
    setLoginError(false);
  };

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
              <Stack direction='column' spacing={2}>
                <Stack direction='column' sx={{ mb: 2 }}>
                  <Typography
                    fontWeight={700}
                    fontSize={40}
                    textAlign={"center"}
                  >
                    Sign in
                  </Typography>
                  <Typography textAlign='center' variant='subtitle2'>
                    to MUI User Management
                  </Typography>
                </Stack>
                <RHFTextField name='username' label='Email' />
                <RHFTextField
                  name='password'
                  type={!showPassword ? "password" : "text"}
                  label='Password'
                  autoComplete='current-password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          ></Iconify>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box ref={slideParentContainer}>
                  <Slide
                    in={loginError}
                    mountOnEnter
                    unmountOnExit
                    container={slideParentContainer.current}
                    direction='down'
                    timeout={{ enter: 200, exit: 0 }}
                  >
                    <Typography textAlign={"center"} sx={{ color: "#E32222" }}>
                      Wrong email / password
                    </Typography>
                  </Slide>
                </Box>
                {!loginError ? (
                  <LoadingButton
                    type='submit'
                    variant='outlined'
                    loading={isSubmitting}
                    sx={{ width: "60%", alignSelf: "center" }}
                  >
                    Login
                  </LoadingButton>
                ) : (
                  <Slide
                    in={loginError}
                    mountOnEnter
                    unmountOnExit
                    container={slideParentContainer.current}
                    direction='down'
                    timeout={{ enter: 400, exit: 0 }}
                  >
                    <Button
                      size='small'
                      variant='outlined'
                      onClick={resetLoginValues}
                    >
                      Reset Login Credentails
                    </Button>
                  </Slide>
                )}
              </Stack>
            </Card>
            <Card
              sx={{
                width: "30%",
                maxWidth: 400,
                py: 2,
                px: 5,
                display: "flex",
                direction: "row",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Link
                component={Typography}
                onClick={() => navigate("/signup")}
                sx={{ cursor: "pointer" }}
              >
                Sign up
              </Link>{" "}
              <Typography>instead</Typography>
            </Card>
          </Stack>
        </FormProvider>
      )}
    </>
  );
}
