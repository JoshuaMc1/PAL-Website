import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

const NavBar = ({ token }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <header>
        <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-secondary">
          <Link to="/" className="cursor-pointer">
            <span className="text-2xl font-bold">PersonalAniList</span>
          </Link>
          <div>
            <HiMenuAlt3
              size={26}
              className="h-6 w-6 cursor-pointer md:hidden block"
              onClick={() => setToggle(!toggle)}
            />
          </div>
          <div
            className={`${
              toggle ? "hidden" : ""
            } w-full md:flex md:items-center md:w-auto transition-transform`}
          >
            <ul className="text-base text-white pt-4 md:flex md:justify-between md:pt-0">
              {token ? (
                <>
                  <li>
                    <Link
                      className="md:p-4 py-2 block hover:bg-gray-700"
                      to={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="md:p-4 py-2 block hover:bg-gray-700"
                      to={"/dashboard/logout"}
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="md:p-4 py-2 block hover:bg-gray-700"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="md:p-4 py-2 block hover:bg-gray-700"
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
