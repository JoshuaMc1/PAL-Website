import { useEffect, useState } from "react";
import { Form, useLoaderData, useActionData, Navigate } from "react-router-dom";
import { deleteAnime, showAnime } from "../../api/api";
import { generateId, formatDate } from "../../helpers/helpers";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import Rate from "../../components/Rate";
import FloatButton from "../../components/FloatButton";
import Alert from "../../components/Alert";
import NoImage from "../../img/no-img.png";

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [];

  if (!data.id) {
    errors.push({
      success: false,
      message: "Algo esta mal, por favor recarga la pagina...",
    });

    return errors;
  }

  const sendData = {
    id: data.id,
  };

  const response = await deleteAnime(data._token, sendData);

  if (response.success) {
    errors.push({
      success: response.success,
      message: response.message,
    });
  } else {
    errors.push({
      success: response.success,
      message: response.message,
    });
  }

  return errors;
}

export function loader({ params }) {
  if (params.slug) {
    return {
      slug: params.slug,
      status: params?.status,
    };
  }

  return false;
}

const Show = ({ token }) => {
  const currentlyOptions = {
    1: "Viendo en emisión",
    2: "Finalizado",
  };

  const seasonSpanish = {
    spring: "Primavera",
    summer: "Verano",
    fall: "Otoño",
    winter: "Invierno",
  };

  const request = useLoaderData();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [generalRating, setGeneralRating] = useState(0),
    [animationRating, setAnimationRating] = useState(0),
    [historyRating, setHistoryRating] = useState(0),
    [charactersRating, setCharactersRating] = useState(0),
    [musicRating, setMusicRating] = useState(0),
    [theBad, setTheBad] = useState(""),
    [theGood, setTheGood] = useState(""),
    [currently, setCurrently] = useState(""),
    [createdAt, setCreatedAt] = useState(""),
    [show, setShow] = useState(false),
    [id, setID] = useState(null),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");

  const action = useActionData(),
    [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (request.slug) {
      const searchAnime = async () => {
        const response = await showAnime(token, request.slug);

        if (response.success) {
          setAnime(response.data.anime);
          setCharacters(response.data.characters);
          setGeneralRating(response.data.overall_rating);
          setAnimationRating(response.data.animation_rating);
          setHistoryRating(response.data.history_rating);
          setCharactersRating(response.data.characters_rating);
          setMusicRating(response.data.music_rating);
          setTheBad(response.data.the_bad);
          setTheGood(response.data.the_good);
          setCurrently(currentlyOptions[response.data.currently]);
          setCreatedAt(formatDate(response.data.created_at));
          setID(response.data.id);
        }
      };

      searchAnime();
    }

    if (request.status === "updated") {
      setMessage("El anime se ha actualizado exitosamente...");
      setShow(true);
      setTimeout(() => setShow(false), 4500);
    } else if (request.status === "created") {
      setMessage("El anime se agrego exitosamente a la lista...");
      setShow(true);
      setTimeout(() => setShow(false), 4500);
    }
  }, [request]);

  useEffect(() => {
    if (action?.length > 0) {
      if (action[0]?.success) {
        setShow(true);
        setMessage(
          `${action[0].message}, sera redirigido a su lista de anime en 4 segundos...`
        );

        setTimeout(() => setRedirect(true), 4000);
      } else {
        setError(action.message);
      }
    }
  }, [action]);

  return (
    <>
      {redirect && <Navigate to={"/dashboard/list/"} replace={"true"} />}
      {show && (
        <div className="w-full mb-6">
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg flex items-center align-middle justify-center">
            <FaCheckCircle
              className="h-6 w-6 text-emerald-600 text-2xl"
              aria-hidden="true"
            />
            <span className="mx-2 text-2xl font-bold text-white">
              {message}
            </span>
          </div>
        </div>
      )}
      {error?.length > 0 && (
        <div className="w-full mb-6">
          <Alert type="danger">{error}</Alert>
        </div>
      )}
      <div className="lg:flex gap-4 mb-6">
        <div className="w-full lg:mb-0 lg:w-1/4 space-y-4 mb-4">
          {/* Poster del anime */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            {Object.keys(anime).length > 0 ? (
              <img
                className="w-full"
                src={anime.image}
                alt={anime.title}
                loading={"lazy"}
              />
            ) : (
              <img
                className="w-full"
                src={NoImage}
                alt="Imagen por defecto"
                loading={"lazy"}
              />
            )}
          </div>
          <div className="bg-secondary p-3 rounded-lg shadow-lg">
            <h2 className="text-2xl text-center text-white font-bold">
              Calificación General
            </h2>
            <div className="text-center">
              <Rate
                rating={generalRating}
                setRating={setGeneralRating}
                editable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Animación
              </h2>
              <div className="text-center">
                <Rate
                  rating={animationRating}
                  setRating={setAnimationRating}
                  editable={false}
                />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Historia
              </h2>
              <div className="text-center">
                <Rate
                  rating={historyRating}
                  setRating={setHistoryRating}
                  editable={false}
                />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Personajes
              </h2>
              <div className="text-center">
                <Rate
                  rating={charactersRating}
                  setRating={setCharactersRating}
                  editable={false}
                />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Música
              </h2>
              <div className="text-center">
                <Rate
                  rating={musicRating}
                  setRating={setMusicRating}
                  editable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:mb-0 lg:w-3/4 space-y-4 mb-4">
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <div className="w-full flex flex-row">
              <h1 className="text-2xl text-white font-bold w-full">
                {anime.title + " - " + anime.title_japanese}
              </h1>
              <Form method="POST" className="w-auto" noValidate>
                <input type="hidden" name="id" defaultValue={id} />
                <input type="hidden" name="_token" defaultValue={token} />
                <button
                  className="w-full px-3 py-2 cursor-pointer bg-red-800 hover:bg-red-900 transition-colors shadow-lg rounded-lg"
                  type="submit"
                  title="Eliminar Anime"
                >
                  <FaTrash className="h-4 w-4 text-white" aria-hidden="true" />
                </button>
              </Form>
            </div>
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
                    : "none"}
                </p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Géneros</h4>
                <div className="flex gap-2">
                  {anime.genres?.map((genre) => (
                    <span key={generateId()} className="text-md text-white">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Episodios</h4>
                <p className="text-md text-white">{anime.episodes}</p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Clasificación</h4>
                <p className="text-md text-white">{anime.rating}</p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Actualmente?</h4>
                <p className="text-md text-white">{currently}</p>
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
                <h4 className="text-xl font-bold text-white">
                  Agregado a la lista
                </h4>
                <p className="text-md text-white">{createdAt}</p>
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold text-white">Estrenado en</h4>
                <p className="text-md text-white">
                  {seasonSpanish[anime.season] + " del " + anime.year}
                </p>
              </div>
            </div>
            <div className="w-full my-6">
              <h4 className="text-xl font-bold text-white">
                Lo bueno del anime
              </h4>
              <p className="text-sm text-white">
                {theGood?.length > 0
                  ? theGood
                  : "No agregaste un comentario sobre lo bueno de este anime."}
              </p>
            </div>
            <div className="w-full my-6">
              <h4 className="text-xl font-bold text-white">
                Lo malo del anime
              </h4>
              <p className="text-sm text-white">
                {theBad?.length > 0
                  ? theBad
                  : "No agregaste un comentario sobre lo malo de este anime."}
              </p>
            </div>
          </div>
          <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white">
              Personajes favoritos
            </h2>
            {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 */}
            {/* grid md:grid-flow-col-dense sm:grid-flow-col gap-2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 py-4">
              {characters.map((character) => (
                <div
                  className="rounded-lg overflow-hidden bg-primary shadow-lg"
                  key={generateId()}
                >
                  <img
                    className="w-full h-96"
                    src={character.image}
                    alt={character.name}
                    loading={"lazy"}
                  />
                  <div className="text-white font-bold text-center text-lg truncate px-1 py-2 capitalize">
                    {character.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FloatButton
        route={`/dashboard/${request.slug}/edit`}
        title="Editar anime"
      />
    </>
  );
};

export default Show;
