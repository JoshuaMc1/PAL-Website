import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const LayoutDashboard = ({ token, load, setLoad }) => {
  return (
    <>
      <div className="flex">
        <SideBar load={load} setLoad={setLoad} token={token} />
        <div className="container mx-2 md:mx-auto mt-5 p-2">{<Outlet />}</div>
      </div>
    </>
  );
};

export default LayoutDashboard;
