import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LayoutIndex from "./components/LayoutIndex";
import Index from "./pages/Index";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/ErrorPage";
import LayoutDashboard from "./components/LayoutDashboard";
import Dashboard from "./pages/dashboard/Dashboard";
import Add, { action as addAction } from "./pages/dashboard/Add";
import List from "./pages/dashboard/List";
import Profile, { action as profileAction } from "./pages/dashboard/Profile";
import SeasonNow from "./pages/dashboard/SeasonNow";
import Upcoming from "./pages/dashboard/Upcoming";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import View from "./pages/dashboard/View";
import { logout } from "./api/api";

const App = () => {
  const [token, setToken] = useState(
    sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null
  );
  const [load, setLoad] = useState(true);

  const addToken = (data) => {
    setToken(data);

    sessionStorage.setItem("token", JSON.stringify(data) ?? null);

    redirect("/dashboard");
  };

  const unauthorized = () => {
    sessionStorage.setItem("token", null);
    setToken(null);
    redirect("/");
    console.clear();
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutIndex token={token} />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/login",
          element: <Login token={token} addToken={addToken} />,
          action: loginAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/register",
          element: <Register token={token} addToken={addToken} />,
          action: registerAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/forgot",
          element: <ForgotPassword token={token} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/change",
          element: <ChangePassword token={token} />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute
          isAllowed={!!token}
          redirectTo="/login"
          unauthorized={unauthorized}
        >
          <LayoutDashboard load={load} setLoad={setLoad} token={token} />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard token={token} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/add",
          element: <Add token={token} />,
          errorElement: <ErrorPage />,
          action: addAction,
        },
        {
          path: "/dashboard/list",
          element: <List token={token} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/profile",
          element: <Profile setLoad={setLoad} token={token} />,
          action: profileAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/view/:id/anime",
          element: <View token={token} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/season",
          element: <SeasonNow />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/upcoming",
          element: <Upcoming />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/*",
          element: <div>Error 404</div>,
        },
        {
          path: "/dashboard/logout",
          errorElement: <ErrorPage />,
          loader: async () => {
            const response = await logout(token);

            if (response.success) {
              sessionStorage.setItem("token", null);
              setToken(null);
            }

            return redirect("/");
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
