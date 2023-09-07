import { Link } from "react-router-dom";

const Card = ({
  url,
  pathImage,
  name,
  background = "bg-primary",
  enabledHover = true,
}) => {
  return (
    <>
      <Link to={url}>
        <div
          className={`rounded-lg overflow-hidden shadow-lg ${background} ${
            enabledHover && "hover:scale-105 transition"
          }`}
        >
          <img
            className="w-full h-96"
            src={pathImage}
            alt={name}
            loading="lazy"
          />
          <div className="text-white font-bold text-center text-lg truncate px-1 py-2 capitalize">
            {name}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
