import { Link } from "react-router-dom";
import { getYear } from "../helpers/helpers";

const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-secondary md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            target="_blank"
            className="flex items-center mb-4 sm:mb-0"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              PersonalAniList
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 sm:mb-0">
            <li>
              <Link
                to={"#"}
                className="mr-4 text-sm text-white hover:underline md:mr-6"
              >
                Política de privacidad
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © {getYear() + " "}
          <Link to={"/"} target="_blank" className="hover:underline">
            PersonalAniList
          </Link>
          . Todos los derechos reservados.
        </span>
      </footer>
    </>
  );
};

export default Footer;
