import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { getList } from "../../api/api";
import { getGenres, getDemographics } from "../../api/characters";
import { generateId } from "../../helpers/helpers";
import { FaSadTear } from "react-icons/fa";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";

const List = ({ token }) => {
  const [list, setList] = useState([]),
    [genres, setGenres] = useState([]),
    [demographic, setDemographics] = useState([]),
    [loading, setLoading] = useState(false),
    [filterDemographics, setFilterDemographics] = useState(""),
    [filterGenre, setFilterGenre] = useState("");

  const handleFilter = (event) => {
    event.preventDefault();

    console.log(
      "Aplicando filtro para: " + filterDemographics + " " + filterGenre
    );
  };

  useEffect(() => {
    setLoading(true);

    const getOptions = async () => {
      const [genre, demographics] = await Promise.all([
        getGenres(),
        getDemographics(),
      ]);

      setGenres(genre.data);
      setDemographics(demographics.data);
    };

    const getData = async () => {
      const lists = await getList(token);

      setList(lists.data);
    };

    getOptions();
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <div className="mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white">Filtro</h2>
        <Form onSubmit={handleFilter}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="mt-2">
              <label
                className="text-xl text-white font-semibold"
                htmlFor="demographic"
              >
                Demografía
              </label>
              <select
                className="p-3 mt-2 rounded-lg shadow-lg bg-primary w-full text-white outline-none"
                id="demographic"
                value={filterDemographics}
                onChange={(e) => setFilterDemographics(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                {demographic.map((item) => (
                  <option key={item.mal_id} value={item.mal_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label
                className="text-xl text-white font-semibold"
                htmlFor="genre"
              >
                Genero
              </label>
              <select
                className="p-3 mt-2 rounded-lg shadow-lg bg-primary w-full text-white outline-none"
                id="genre"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                {genres.map((item) => (
                  <option key={item.mal_id} value={item.mal_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label
                className="text-xl text-white font-semibold"
                htmlFor="orderBy"
              >
                Ordenar por
              </label>
              <select
                className="p-3 mt-2 rounded-lg shadow-lg bg-primary w-full text-white outline-none"
                id="orderBy"
              >
                <option value="1">Agregados recientemente</option>
                <option value="2">Ascendente</option>
                <option value="3">Descendente</option>
              </select>
            </div>
            <div className="md:col-span-2 flex align-bottom">
              <input
                className="bg-primary px-3 py-2 text-white rounded-lg shadow-lg font-bold hover:bg-gray-700 transition-colors w-full cursor-pointer"
                type="submit"
                value="Aplicar filtro"
              />
            </div>
          </div>
        </Form>
      </div>
      {loading ? (
        <div className="container h-96">
          <div className="flex h-full justify-center items-center">
            <Spinner />
          </div>
        </div>
      ) : Object.keys(list).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 mb-4">
          {list.map((data) => (
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

export default List;
