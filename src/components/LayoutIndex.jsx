import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const LayoutIndex = ({ token }) => {
  return (
    <div className="h-screen">
      <NavBar token={token} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutIndex;
