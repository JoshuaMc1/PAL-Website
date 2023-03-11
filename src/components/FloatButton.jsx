import { Link } from "react-router-dom";

const FloatButton = ({
  title = "Botón flotante",
  route = "#",
  isEnabled = true,
}) => {
  return (
    <>
      <Link
        to={isEnabled ? route : "#"}
        className="fixed flex bg-primary p-4 rounded-lg right-16 bottom-16 z-50 shadow-lg hover:bg-gray-700 transition-colors"
      >
        <h4 className="text-sm text-ellipsis text-white font-bold">{title}</h4>
      </Link>
    </>
  );
};

export default FloatButton;
