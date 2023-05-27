import { Container, Stack, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Container>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ height: "100vh" }}
      >
        <Typography fontSize={44} fontWeight={700}>
          404
        </Typography>
        <Typography fontSize={32} fontWeight={500}>
          Sorry, the requested page couldn't be found
        </Typography>
      </Stack>
    </Container>
  );
}
