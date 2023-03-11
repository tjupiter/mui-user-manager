import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { UserList, ErrorPage } from "./pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user-management",
    element: <UserList />,
  },
  {
    path: "/user-management/new",
    element: <UserList />,
  },
  {
    path: "/user-management/user/:id/edit",
    element: <div>EDIT</div>,
  },
  {},
]);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      {" "}
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
