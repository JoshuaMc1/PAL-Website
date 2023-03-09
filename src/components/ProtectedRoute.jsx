import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../api/api";

const ProtectedRoute = ({
  children,
  isAllowed,
  redirectTo = "/",
  unauthorized,
}) => {
  const verifyToken = async () => {
    const usr = await getUserData(isAllowed);

    console.log(usr);

    if (!usr.success) {
      unauthorized();
    }
  };

  if (!isAllowed) {
    verifyToken();
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
