import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { IoIosAddCircle, IoMdListBox } from "react-icons/io";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdUpcoming } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Profile from "../img/default.svg";
import useScreenSize from "../hook/useScreenSize";
import { getUserData } from "../api/api";

const SideBar = ({ token, load, setLoad }) => {
  const [open, setOpen] = useState(true),
    { width, height } = useScreenSize();
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getUserData(token);

      if (data.success) {
        setDataUser(data.user);
        setLoad(false);
      }
    };
    getData();
  }, [load]);

  const menus = [
    { name: "Inicio", link: "/dashboard", icon: AiFillHome },
    {
      name: "Agregar anime",
      link: "/dashboard/add",
      icon: IoIosAddCircle,
      margin: true,
    },
    { name: "Ver Lista", link: "/dashboard/list", icon: IoMdListBox },
    {
      name: "Temporada actual",
      link: "/dashboard/season",
      icon: IoCalendarNumberSharp,
    },
    {
      name: "Próximos estrenos",
      link: "/dashboard/upcoming",
      icon: MdUpcoming,
    },
    {
      name: "Perfil",
      link: "/dashboard/profile",
      icon: FaUserAlt,
      margin: true,
    },
    { name: "Cerrar sesión", link: "/dashboard/logout", icon: IoExit },
  ];

  useEffect(() => {
    if (width < 900) {
      setOpen(false);
    } else setOpen(true);
  }, [width]);

  return (
    <>
      <section className="flex gap-6">
        <div
          className={`bg-secondary min-h-screen shadow-lg ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <Link
            to={"/dashboard/profile"}
            className="py-2 flex flex-col items-center cursor-pointer"
          >
            <img
              className={`${
                open ? "w-40 h-40" : "w-9 h-9"
              } aspect-auto rounded-full`}
              src={dataUser.photo === null ? Profile : dataUser.photo_url}
              alt="Foto de perfil"
            />
            <h1 className={`${open ? "text-xl font-bold mt-3" : "hidden"}`}>
              {dataUser.names + " " + dataUser.surnames}
            </h1>
          </Link>
          <hr className="border-gray-500 my-2" />
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-lg gap-3.5 font-medium p-2 hover:bg-gray-700 transition-colors rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SideBar;
