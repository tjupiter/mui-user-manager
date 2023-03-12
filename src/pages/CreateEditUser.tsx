import { useEffect, MouseEvent } from "react";
import { useSnackbar } from "notistack";
import { useLocation, useParams } from "react-router-dom";
// mui
import {
  Autocomplete,
  Avatar,
  Box,
  Card,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import { HeaderBreadCrumbs } from "../components";

// API
import { getSettings } from "../api";
// Redux
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSettingsData } from "../redux/settingsSlice";
// utils
import useIsLoading from "../utils/custom-hooks/useIsLoading";
// types
import { SettingsState } from "../redux/settingsSlice";
// ===================================
//          CUSTOM COMPONENT
// ===================================
const SectionLabel = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 700,
}));

export default function CreateEditUser() {
  const { isLoading, loadingStarted, loadingFinished } = useIsLoading();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");

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
          `Whoops, something went wrong here: fetchUsers() \n ${error}`
        );
      }
    }
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
      href='/user-management'
      // onClick={handleClick}
    >
      User Management
    </Link>,
    <Typography key='3'>{isEdit ? "Edit" : "Create"} user</Typography>,
  ];

  // ===================================
  return (
    <Box>
      <HeaderBreadCrumbs
        heading='User Management'
        breadcrumbs={BREADCRUMBS}
        sx={{ pt: 5, pl: 6 }}
      />
      <Grid container spacing={5} sx={{ p: 4 }}>
        <Grid container item xs={12} md={5} direction='column'>
          <Card sx={{ p: 5 }}>
            <Stack spacing={5} sx={{ minHeight: "34vh" }}>
              <Stack spacing={2}>
                <SectionLabel>Personal info</SectionLabel>
                <Stack direction='row' spacing={3}>
                  <Avatar sx={{ width: 120, height: 120 }} />
                  <Stack direction='column' sx={{ width: "100%" }} spacing={1}>
                    <TextField
                      label='First name'
                      name='first_name'
                      fullWidth
                      variant='standard'
                    />
                    <TextField
                      label='Last name'
                      name='last_name'
                      fullWidth
                      variant='standard'
                    />
                  </Stack>
                </Stack>
                <TextField
                  label='Date of birth'
                  name='dob'
                  fullWidth
                  variant='standard'
                />
                <TextField
                  label='Email'
                  name='email'
                  fullWidth
                  variant='standard'
                />
                <TextField
                  label='Phone'
                  name='phone'
                  fullWidth
                  variant='standard'
                />
              </Stack>
              <SectionLabel>Additional info</SectionLabel>
              <Stack direction='row' spacing={3}>
                <Autocomplete
                  sx={{ width: "50%" }}
                  options={settingsFromRedux.eye_color_options}
                  getOptionLabel={(option) => option}
                  defaultValue='All'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='standard'
                      label='Eye color'
                    />
                  )}
                />
                <Autocomplete
                  sx={{ width: "50%" }}
                  options={settingsFromRedux.hair_color_options}
                  getOptionLabel={(option) => option}
                  defaultValue='All'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='standard'
                      label='Hair color'
                    />
                  )}
                />
                <Autocomplete
                  sx={{ width: "50%" }}
                  options={settingsFromRedux.blood_group_options}
                  getOptionLabel={(option) => option}
                  defaultValue='All'
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='standard'
                      label='Blood group'
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid container item xs={12} md={7} direction='column'>
          <Card>
            <Stack
              spacing={5}
              sx={{ p: 5, minHeight: "34vh" }}
              direction='column'
            >
              <Stack direction='column' spacing={1}>
                <SectionLabel>Address</SectionLabel>
                <TextField
                  label='First line'
                  name='first_line'
                  variant='standard'
                  autoComplete='address-line1'
                />
                <TextField
                  label='Second line'
                  name='second_line'
                  variant='standard'
                  autoComplete='address-line2'
                />
                <TextField
                  label='City or town'
                  name='city_or_town'
                  variant='standard'
                />
                <TextField
                  label='Postcode'
                  name='postcode'
                  variant='standard'
                />
              </Stack>

              <Stack direction='column' spacing={1}>
                <SectionLabel>Work info</SectionLabel>
                <TextField label='Company' name='company' variant='standard' />
                <TextField
                  label='Department'
                  name='department'
                  variant='standard'
                />
                <TextField label='Title' name='title' variant='standard' />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

//"users": [
// {
//   "id": 1,
//   "firstName": "Terry",
//   "lastName": "Medhurst",
//   "maidenName": "Smitham",
//   "age": 50,
//   "gender": "male",
//   "email": "atuny0@sohu.com",
//   "phone": "+63 791 675 8914",
//   "username": "atuny0",
//   "password": "9uQFF1Lh",
//   "birthDate": "2000-12-25",
//   "image": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
//   "bloodGroup": "A−",
//   "height": 189,
//   "weight": 75.4,
//   "eyeColor": "Green",
//   "hair": {
//     "color": "Black",
//     "type": "Strands"
//   },
//   "domain": "slashdot.org",
//   "ip": "117.29.86.254",
//   "address": {
//     "address": "1745 T Street Southeast",
//     "city": "Washington",
//     "coordinates": {
//       "lat": 38.867033,
//       "lng": -76.979235
//     },
//     "postalCode": "20020",
//     "state": "DC"
//   },
//   "macAddress": "13:69:BA:56:A3:74",
//   "university": "Capitol University",
//   "bank": {
//     "cardExpire": "06/22",
//     "cardNumber": "50380955204220685",
//     "cardType": "maestro",
//     "currency": "Peso",
//     "iban": "NO17 0695 2754 967"
//   },
//   "company": {
//     "address": {
//       "address": "629 Debbie Drive",
//       "city": "Nashville",
//       "coordinates": {
//         "lat": 36.208114,
//         "lng": -86.58621199999999
//       },
//       "postalCode": "37076",
//       "state": "TN"
//     },
//     "department": "Marketing",
//     "name": "Blanda-O'Keefe",
//     "title": "Help Desk Operator"
//   },
//   "ein": "20-9487066",
//   "ssn": "661-64-2976",
//   "userAgent": "Mozilla/5.0 ..."
// },
