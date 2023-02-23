import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// @mui
import { Card } from "@mui/material";

import UserList from "./pages/UserList";

export default function App() {
  return (
    <Card sx={{ p: 2 }}>
      <UserList />
    </Card>
  );
}
