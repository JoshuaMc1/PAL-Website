import { useState } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Add, {
  action as addAction,
  loader as addLoader,
} from "./pages/dashboard/Add";
import { logout } from "./api/api";
import Login, { action as loginAction } from "./pages/Login";
import Register, { action as registerAction } from "./pages/Register";
import Profile, { action as profileAction } from "./pages/dashboard/Profile";
import View, { loader as loaderView } from "./pages/dashboard/View";
import AnimeEdit, {
  loader as loaderEdit,
  action as animeEditAction,
} from "./pages/dashboard/AnimeEdit";
import Show, {
  loader as loaderShow,
  action as actionShow,
} from "./pages/dashboard/Show";
import LayoutIndex from "./components/LayoutIndex";
import Index from "./pages/Index";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/ErrorPage";
import LayoutDashboard from "./components/LayoutDashboard";
import Dashboard from "./pages/dashboard/Dashboard";
import List from "./pages/dashboard/List";
import SeasonNow from "./pages/dashboard/SeasonNow";
import Upcoming from "./pages/dashboard/Upcoming";
import ProtectedRoute from "./components/ProtectedRoute";
import Error404 from "./pages/Error404";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("rememberMe") === "true"
      ? localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null
      : sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null
  );
  const [load, setLoad] = useState(true);

  const addToken = (data) => {
    setToken(data);

    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("token", JSON.stringify(data) ?? null);
    } else {
      sessionStorage.setItem("token", JSON.stringify(data) ?? null);
    }

    redirect("/dashboard");
  };

  const unauthorized = () => {
    sessionStorage.setItem("token", null);
    localStorage.setItem("rememberMe", false);
    localStorage.setItem("token", null);
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
          path: "/dashboard/add/:slug?",
          element: <Add token={token} />,
          errorElement: <ErrorPage />,
          action: addAction,
          loader: addLoader,
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
          path: "/dashboard/view/:slug/show/:status?",
          element: <Show token={token} />,
          errorElement: <ErrorPage />,
          loader: loaderShow,
          action: actionShow,
        },
        {
          path: "/dashboard/view/:slug/view",
          element: <View token={token} />,
          errorElement: <ErrorPage />,
          loader: loaderView,
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
          element: <Error404 />,
        },
        {
          path: "/dashboard/:anime/edit",
          element: <AnimeEdit token={token} />,
          loader: loaderEdit,
          action: animeEditAction,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard/logout",
          errorElement: <ErrorPage />,
          loader: async () => {
            const response = await logout(token);

            if (response.success) {
              sessionStorage.setItem("token", null);
              localStorage.setItem("token", null);
              localStorage.setItem("rememberMe", false);
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
