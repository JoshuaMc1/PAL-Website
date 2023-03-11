import Card from "./Card";
import { FaSadTear } from "react-icons/fa";
import { generateId } from "../helpers/helpers";

const HighestRating = ({ highest }) => {
  return (
    <>
      {Object.keys(highest).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {highest.map((data) => (
            <Card
              key={generateId()}
              url={`/dashboard/view/${data.slug}/show`}
              pathImage={data.data.image}
              name={data.data.title}
              background="bg-secondary"
            />
          ))}
        </div>
      ) : (
        <div className="container h-80">
          <div className="flex flex-col h-full justify-center items-center">
            <FaSadTear className="text-white text-2xl" />
            <h1 className="text-white text-2xl font-bold">
              Aun no tienes animes en tu lista
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default HighestRating;
