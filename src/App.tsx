import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// @mui
import { Box } from "@mui/material";

import UserList from "./pages/UserList";

export default function App() {
  return (
    <Box
      sx={{
        p: 2,
        m: "4rem auto",
        maxWidth: "1200px",
        // borderRadius: ".5rem",
        // boxShadow: "-2px 7px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <UserList />
    </Box>
  );
}
