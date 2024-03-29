// @mui
import { Box } from "@mui/material";

import UserList from "./pages/UserList";

export default function App() {
  return (
    <Box
      sx={{
        px: 2,
        m: "4rem auto",
        maxWidth: "1200px",
        position: "relative",
      }}
    >
      <UserList />
    </Box>
  );
}
