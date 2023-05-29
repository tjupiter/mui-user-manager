import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//components
import App from "./App";
import { CreateEditUser, ErrorPage, Login, NotFound, Signup } from "./pages";
import { UserAuthContextProvider } from "./contexts-providers/UserAuthContext";
import NotistackProvider from "./contexts-providers/NotistackProvider";
import ProtectedRoute from "./contexts-providers/ProtectedRoute";
// redux
import { store } from "./redux/store";
import { Provider } from "react-redux";
//
import reportWebVitals from "./reportWebVitals";
//
import "./index.css";
//

const development = process.env.NODE_ENV === "development" ? true : false;

// This needs to get sorted so is the Routes/ProtectedRoutes

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/user-management",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/user-management/new",
      element: (
        <ProtectedRoute>
          <CreateEditUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user-management/user/:id/edit",
      element: (
        <ProtectedRoute>
          <CreateEditUser />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  { basename: development ? "/" : "/projects/mui-user-manager" }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NotistackProvider>
      <Provider store={store}>
        <UserAuthContextProvider>
          <RouterProvider router={router} />
        </UserAuthContextProvider>
      </Provider>
    </NotistackProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
