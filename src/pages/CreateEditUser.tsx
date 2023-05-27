import { useEffect, MouseEvent, useState, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
// mui
import {
  Avatar,
  Button,
  Box,
  Card,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
// components
import {
  HeaderBreadCrumbs,
  RHFAutocomplete,
  RHFTextField,
} from "../components";
// API
import { getSettings, getSingleUser } from "../api";
// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSettingsData } from "../redux/settingsSlice";
// form: YUP + RHF
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../utils/custom-hooks/FormProvider";
// utils
import useIsLoading from "../utils/custom-hooks/useIsLoading";
import { RANDOM_USER_VALUES } from "../utils";
// types
import { User, SubmitDataResolver } from "../types";

// ===================================
//          CUSTOM COMPONENT
// ===================================

const SectionLabel = styled(Typography)(() => ({
  fontSize: 24,
  fontWeight: 700,
}));

export default function CreateEditUser() {
  const { isLoading, loadingStarted, loadingFinished } = useIsLoading();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");

  const [user, setuser] = useState<User>();

  // ===================================
  //            FETCH SETTINGS
  // ===================================

  useEffect(() => {
    async function fetchSettingsData() {
      try {
        const settings = await getSettings();
        dispatch(setSettingsData(settings));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Whoops, something went wrong here: fetchSettingsData() \n ${error}`,
          { variant: "error" }
        );
      }
    }
    async function fetchSingleUser() {
      try {
        const singleUser = await getSingleUser(Number(id));
        setuser(singleUser);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Whoops, something went wrong here: fetchUsers() \n ${error}`,
          { variant: "error" }
        );
      }
    }
    id && fetchSingleUser();
    fetchSettingsData().finally(() => loadingFinished());
  }, []);
  const settingsFromRedux = useAppSelector((state) => state.settings);

  // ===================================
  //              BREADCRUMBS
  // ===================================

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const BREADCRUMBS = [
    <Link
      underline='hover'
      key='1'
      color='inherit'
      href='#'
      // onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline='hover'
      key='2'
      color='inherit'
      href='/'
      // onClick={handleClick}
    >
      User Management
    </Link>,
    <Typography key='3' sx={{ textDecoration: "underline" }}>
      {isEdit ? "Edit" : "Create"} user
    </Typography>,
  ];

  // ===================================
  //        FORM VALIDATION + RHF
  // ===================================

  const NewUserSchema = object().shape({
    first_name: string().required("First name is required"),
    last_name: string().required("Last name is required"),
    dob: string().required("Date of birt is required"),
    email: string().required("Email is required"),
    phone: string().required("Phone is required"),
    eye_color: string().required("Eye color is required"),
    hair_color: string().required("Hair color is required"),
    blood_group: string().required("Blood type is required"),
    first_line: string().required("First line is required"),
    city_or_town: string().required("City is required"),
    postcode: string().required("Postcode is required"),
    company: string().required("Company name is required"),
    department: string().required("Department is required"),
    title: string().required("Title is required"),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: user?.firstName || "",
      last_name: user?.lastName || "",
      dob: user?.birthDate || "",
      email: user?.email || "",
      phone: user?.phone || "",
      eye_color: user?.eyeColor || "",
      hair_color: user?.hair.color || "",
      blood_group: user?.bloodGroup || "",
      first_line: user?.address.address || "",
      city_or_town: user?.address.city || "",
      postcode: user?.address.postalCode || "",
      company: user?.company.name || "",
      department: user?.company.department || "",
      title: user?.company.title || "",
    }),
    [user]
  );

  const methods = useForm<SubmitDataResolver>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!isEmpty(user) && user) {
      reset(defaultValues);
    }
    if (!isEmpty(user)) {
      reset(defaultValues);
    }
  }, [user]);

  // ===================================
  //               SUBMIT
  // ===================================

  const onSubmit = async (data: SubmitDataResolver) => {
    try {
      // !isEmpty(user) ? await updateUser(data, user.id) : createUser(data)
      console.log(data);
      enqueueSnackbar(
        !isEmpty(user)
          ? "User successfully updated"
          : "New user successfully created",
        { variant: "success" }
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const onError = (error: unknown) => console.error(error);

  // ===================================
  //        TEMP FN FOR TESTING
  // ===================================
  function fillOutForm() {
    reset(RANDOM_USER_VALUES);
  }

  // ===================================

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
      <Box sx={{ px: 5 }}>
        <Stack
          direction='row'
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HeaderBreadCrumbs
            heading='User Management'
            breadcrumbs={BREADCRUMBS}
            sx={{ pt: 5, pl: 20 }}
          />
          <Button
            type='button'
            variant='contained'
            onClick={() => fillOutForm()}
          >
            FillOutForm
          </Button>
        </Stack>
        <Grid container spacing={5} sx={{ p: 4, maxWidth: 1500, mx: "auto" }}>
          <Grid container item xs={12} md={5} direction='column'>
            <Card sx={{ p: 5 }}>
              <Stack spacing={5}>
                <Stack spacing={2}>
                  <SectionLabel>Personal info</SectionLabel>
                  <Stack direction='row' spacing={3}>
                    <Avatar sx={{ width: 120, height: 120 }} />
                    <Stack
                      direction='column'
                      sx={{ width: "100%" }}
                      spacing={1}
                    >
                      <RHFTextField
                        label='First name'
                        name='first_name'
                        variant='standard'
                      />

                      <RHFTextField
                        label='Last name'
                        name='last_name'
                        variant='standard'
                      />
                    </Stack>
                  </Stack>
                  <RHFTextField
                    label='Date of birth'
                    name='dob'
                    variant='standard'
                  />
                  <RHFTextField label='Email' name='email' variant='standard' />
                  <RHFTextField label='Phone' name='phone' variant='standard' />
                </Stack>
                <SectionLabel>Additional info</SectionLabel>
                <Stack direction='row' spacing={3}>
                  <RHFAutocomplete
                    label='Eye color'
                    name='eye_color'
                    options={settingsFromRedux.eye_color_options}
                    textFieldVariant='standard'
                    defaultValue='All'
                    sx={{ width: "50%" }}
                    //
                  />
                  <RHFAutocomplete
                    label='Hair color'
                    name='hair_color'
                    options={settingsFromRedux.hair_color_options}
                    textFieldVariant='standard'
                    defaultValue='All'
                    sx={{ width: "50%" }}
                  />
                  <RHFAutocomplete
                    label='Blood group'
                    name='blood_group'
                    options={settingsFromRedux.blood_group_options}
                    textFieldVariant='standard'
                    defaultValue='All'
                    sx={{ width: "50%" }}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid container item xs={12} md={7} direction='column'>
            <Card>
              <Stack
                spacing={5}
                sx={{ p: 5, minHeight: "55vh" }}
                direction='column'
              >
                <Stack direction='column' spacing={1}>
                  <SectionLabel>Address</SectionLabel>
                  <RHFTextField
                    label='First line'
                    name='first_line'
                    variant='standard'
                    autoComplete='address-line1'
                  />
                  <RHFTextField
                    label='Second line'
                    name='second_line'
                    variant='standard'
                    autoComplete='address-line2'
                  />
                  <RHFTextField
                    label='City or town'
                    name='city_or_town'
                    variant='standard'
                  />
                  <RHFTextField
                    label='Postcode'
                    name='postcode'
                    variant='standard'
                  />
                </Stack>

                <Stack direction='column' spacing={1}>
                  <SectionLabel>Work info</SectionLabel>
                  <RHFTextField
                    label='Company'
                    name='company'
                    variant='standard'
                  />
                  <RHFTextField
                    label='Department'
                    name='department'
                    variant='standard'
                  />
                  <RHFTextField label='Title' name='title' variant='standard' />
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <LoadingButton
              type='submit'
              variant='outlined'
              size='large'
              loading={isSubmitting}
            >
              {!isEmpty(user) ? "Save Change" : "Create User"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
