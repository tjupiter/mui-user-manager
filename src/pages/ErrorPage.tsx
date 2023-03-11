import { useRouteError } from "react-router-dom";
// mui
import { Stack, Typography } from "@mui/material";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <Stack
      direction='column'
      alignItems={"center"}
      justifyContent='center'
      spacing={3}
    >
      <Typography fontSize={36} fontWeight={700}>
        Whoops
      </Typography>
      <Typography>An unexpected error has occurred... :(</Typography>
      <Typography>{error?.statusText || error?.message}</Typography>
    </Stack>
  );
}
