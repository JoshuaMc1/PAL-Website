import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getAnime } from "../../api/api";
import { getAnime as loadAnimeApi } from "../../api/characters";
import { generateId } from "../../helpers/helpers";
import { FaExclamationTriangle } from "react-icons/fa";
import FloatButton from "../../components/FloatButton";
import NoImage from "../../img/no-img.png";

export function loader({ params }) {
  if (params.slug) {
    if (parseInt(params.slug)) {
      return {
        search: true,
        slug: params.slug,
      };
    }
    return {
      search: false,
      slug: params.slug,
    };
  }

  return false;
}

const View = ({ token }) => {
  const seasonSpanish = {
    spring: "Primavera",
    summer: "Verano",
    fall: "Otoño",
    winter: "Invierno",
  };

  const request = useLoaderData();
  const [anime, setAnime] = useState({});

  useEffect(() => {
    if (request) {
      if (request.search) {
        const searchAnime = async () => {
          const response = await loadAnimeApi(request.slug);

          const newAnime = {
            year: response.data.year,
            image: response.data.images.jpg.large_image_url,
            title: response.data.title,
            airing: response.data.airing,
            genres: response.data.genres,
            mal_id: response.data.mal_id,
            rating: response.data.rating,
            season: response.data.season,
            status: response.data.status,
            studios: response.data.studios,
            trailer: response.data.trailer,
            episodes: response.data.episodes,
            synopsis: response.data.synopsis,
            demographics: response.data.demographics,
            title_japanese: response.data.title_japanese,
            slug: response.data.mal_id,
          };

          setAnime(newAnime);
        };

        searchAnime();
      } else {
        const searchAnime = async () => {
          const response = await getAnime(token, request.slug);

          if (response.success) {
            setAnime(response.data);
          }
        };

        searchAnime();
      }
    }
  }, [request]);

  return (
    <>
      {anime.status === "Not yet aired" && (
        <div className="w-full mb-6">
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg flex items-center align-middle justify-center">
            <FaExclamationTriangle
              className="h-6 w-6 text-red-800 text-2xl"
              aria-hidden="true"
            />
            <span className="mx-2 text-2xl font-bold text-white">
              Los animes que aun no se han emitido o estrenado no se pueden
              agregar a la lista.
            </span>
          </div>
        </div>
      )}
      <div className="lg:flex gap-4 mb-4">
        <div className="w-full lg:mb-0 lg:w-1/4 space-y-4 mb-4">
          <div className="overflow-hidden rounded-lg shadow-lg">
            {Object.keys(anime).length > 0 ? (
              <img className="w-full" src={anime.image} alt={anime.title} />
            ) : (
              <img className="w-full" src={NoImage} alt="Imagen por defecto" />
            )}
          </div>
        </div>
        <div className="w-full lg:mb-0 lg:w-3/4 space-y-4 mb-4">
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <p className="text-2xl text-white font-bold">
              {anime.title + " - " + anime.title_japanese}
            </p>
            <div className="my-6">
              <h4 className="text-xl font-bold text-white">Sinopsis</h4>
              <p className="text-sm text-white">{anime.synopsis}</p>
            </div>
            <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Demografía</h4>
                <p className="text-md text-white">
                  {anime?.demographics?.length > 0
                    ? anime.demographics[0].name
                    : "No hay demografía"}
                </p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Géneros</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {anime.genres?.map((genre) => (
                    <span key={generateId()} className="text-md text-white">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Episodios</h4>
                <p className="text-md text-white">
                  {anime.episodes === null ? "No hay datos" : anime.episodes}
                </p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Clasificación</h4>
                <p className="text-md text-white">{anime.rating}</p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Estudios</h4>
                <div className="flex gap-2">
                  {anime.studios?.map((studio) => (
                    <span key={generateId()} className="text-md text-white">
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Estrenado en</h4>
                <p className="text-md text-white">
                  {anime.season === null
                    ? "No hay fecha de estreno"
                    : seasonSpanish[anime.season] + " del " + anime.year}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <h4 className="text-xl font-bold text-white">Trailers</h4>
            {anime?.trailer?.embed_url === null ? (
              <div className="w-full h-96 my-6 flex justify-center content-center items-center">
                <h3 className="text-6xl font-bold text-white">
                  No hay trailer disponible
                </h3>
              </div>
            ) : (
              <iframe
                className="w-full h-trailer my-6"
                src={anime?.trailer?.embed_url}
                title={"Video de " + anime?.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
      <FloatButton
        title={"Agregar a la lista"}
        route={`/dashboard/add/${anime.slug}`}
        isEnabled={anime.status === "Not yet aired" ? false : true}
      />
    </>
  );
};

export default View;
