import React from "react";
import logo from "./logo.svg";
import "./App.css";

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
