import { useEffect, useState } from "react";
import { Form, Navigate, useActionData, useLoaderData } from "react-router-dom";
import { showAnime, updateAnime } from "../../api/api";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import ConfirmDialog from "../../components/ConfirmDialog";
import Input from "../../components/Input";
import ModalAnimeCharacters from "../../components/ModalAnimeCharacters";
import Rate from "../../components/Rate";
import Textarea from "../../components/Textarea";
import NoImage from "../../img/no-img.png";

export function loader({ params }) {
  if (params.anime) {
    return params.anime;
  }

  return false;
}

export async function action({ request }) {
  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [];

  if (!data.token?.length > 0) {
    errors.push({
      type: "danger",
      message:
        "No se puede guardar en la lista, por favor refrescar la pagina...",
    });
    return errors;
  }

  if (!data.anime?.length > 0) {
    errors.push({
      type: "danger",
      message: "Debe buscar el anime que desea agregar a la lista...",
    });
    return errors;
  }

  if (!data.status?.length > 0) {
    errors.push({
      type: "danger",
      message:
        "Debe seleccionar un estado actual, si ya finalizo el anime o lo esta viendo en emisión...",
    });
    return errors;
  }

  if (!data.characters?.length > 0) {
    errors.push({
      type: "danger",
      message: "Debe agregar al menos un personaje favorito a la lista...",
    });
    return errors;
  }

  const anime = JSON.parse(data.anime);
  const characters = JSON.parse(data.characters);

  const newCharacters = characters.map((character) => {
    if (character.hasOwnProperty("images")) {
      const image = character.images.jpg.image_url;
      character.image = character.images;
      character["image"] = image;
      delete character.images;
    }
    return character;
  });

  const newData = {
    general: {
      overall_rating: data.generalRating,
      animation_rating: data.animationRating,
      history_rating: data.historyRating,
      characters_rating: data.charactersRating,
      music_rating: data.musicRating,
      currently: data.status,
      the_good: data.good,
      the_bad: data.bad,
    },
    anime: anime,
    characters: characters,
    newCharacters: newCharacters,
  };

  const response = await updateAnime(data.token, newData);

  if (!response.success) {
    errors.push({
      type: "danger",
      message: response.message,
    });

    return errors;
  }

  return {
    success: true,
    message: response.message,
    slug: response.slug,
  };
}

const AnimeEdit = ({ token }) => {
  const [open, setOpen] = useState(false),
    [openConfirmation, setOpenConfirmation] = useState(false),
    [anime, setAnime] = useState({}),
    [characters, setCharacters] = useState([]),
    [genres, setGenres] = useState([]),
    [demographics, setDemographics] = useState([]),
    [deleteCharacter, setDeleteCharacter] = useState({}),
    [generalRating, setGeneralRating] = useState(0),
    [animationRating, setAnimationRating] = useState(0),
    [historyRating, setHistoryRating] = useState(0),
    [charactersRating, setCharactersRating] = useState(0),
    [musicRating, setMusicRating] = useState(0),
    [currently, setCurrently] = useState(""),
    [isEnabled, setIsEnabled] = useState(true),
    [theBad, setTheBad] = useState(""),
    [theGood, setTheGood] = useState(""),
    [isRedirect, setIsRedirect] = useState(false),
    [slug, setSlug] = useState("");

  const loader = useLoaderData();
  const errors = useActionData();

  useEffect(() => {
    if (errors?.success) {
      setSlug(errors.slug);
      setIsRedirect(true);
    }
  }, [errors]);

  useEffect(() => {
    if (loader.length > 0) {
      const searchAnime = async () => {
        const response = await showAnime(token, loader);

        const tempAnime = response.data.anime;
        tempAnime.slug = loader;
        setAnime(tempAnime);
        setGenres(response.data.anime.genres);
        setCharacters(response.data.characters);
        setCurrently(response.data.currently);
        setGeneralRating(response.data.overall_rating);
        setAnimationRating(response.data.animation_rating);
        setHistoryRating(response.data.history_rating);
        setCharactersRating(response.data.characters_rating);
        setMusicRating(response.data.music_rating);
        setTheBad(response.data.the_bad);
        setTheGood(response.data.the_good);
        setIsEnabled(false);
        if (response.data.anime.demographics.length > 0) {
          setDemographics(response.data.anime.demographics);
        } else setDemographics([{ name: "none" }]);
      };

      searchAnime();
    }
  }, [loader]);

  useEffect(() => {
    if (characters?.length > 4) {
      setIsEnabled(true);
    } else {
      if (anime?.length > 0) {
        setIsEnabled(false);
      }
    }
  }, [characters]);

  const openModal = () => {
    setOpen(true);
  };

  const handleStatusChange = (event) => {
    setCurrently(event.target.value);
  };

  return (
    <>
      {isRedirect && (
        <Navigate to={`/dashboard/view/${slug}/show/updated`} replace={true} />
      )}
      {errors?.length > 0 && (
        <Alert type={errors[0]?.type}>{errors[0]?.message}</Alert>
      )}
      <Form method="POST" noValidate>
        <input type="hidden" name="token" defaultValue={token} />
        <input
          type="hidden"
          name="anime"
          defaultValue={JSON.stringify(anime)}
        />
        <input
          type="hidden"
          name="characters"
          defaultValue={
            characters?.length > 0 ? JSON.stringify(characters) : ""
          }
        />
        <input
          type="hidden"
          name="generalRating"
          defaultValue={generalRating}
        />
        <input
          type="hidden"
          name="animationRating"
          defaultValue={animationRating}
        />
        <input
          type="hidden"
          name="historyRating"
          defaultValue={historyRating}
        />
        <input
          type="hidden"
          name="charactersRating"
          defaultValue={charactersRating}
        />
        <input type="hidden" name="musicRating" defaultValue={musicRating} />
        <div className="lg:flex gap-4">
          <div className="w-full lg:mb-0 lg:w-1/4 space-y-4 mb-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
              {Object.keys(anime).length > 0 ? (
                <img
                  className="w-full"
                  src={
                    anime.images
                      ? anime.images.jpg.large_image_url
                      : anime.image
                  }
                  alt={anime.title}
                />
              ) : (
                <img
                  className="w-full"
                  src={NoImage}
                  alt="Imagen por defecto"
                />
              )}
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Calificación General
              </h2>
              <div className="text-center">
                <Rate rating={generalRating} setRating={setGeneralRating} />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Animación
              </h2>
              <div className="text-center">
                <Rate rating={animationRating} setRating={setAnimationRating} />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Historia
              </h2>
              <div className="text-center">
                <Rate rating={historyRating} setRating={setHistoryRating} />
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
                />
              </div>
            </div>
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Música
              </h2>
              <div className="text-center">
                <Rate rating={musicRating} setRating={setMusicRating} />
              </div>
            </div>
          </div>
          <div className="w-full lg:mb-0 lg:w-3/4 space-y-4 mb-4">
            <Input
              labelName="Nombre del anime"
              inputType="text"
              placeholder="Nombre del anime"
              defaultValue={anime.title || ""}
              id="title"
              readOnly={true}
            />
            <Textarea
              labelName="Sinopsis"
              id="synopsis"
              defaultValue={
                Object(anime.synopsis).length > 0 ? anime.synopsis : ""
              }
              readOnly={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Géneros del anime */}
              <div className="px-5 py-6 bg-secondary rounded-lg shadow-lg md:col-span-2">
                <h3 className="text-2xl text-white font-bold mb-3">Géneros</h3>
                <div className="flex gap-2">
                  {Object.keys(anime).length > 0 ? (
                    genres.map((genre) => (
                      <div
                        key={genre.mal_id}
                        className="bg-primary px-3 py-2 rounded-lg shadow-lg text-white font-bold cursor-pointer hover:bg-gray-700 transition-colors"
                      >
                        {genre.name}
                      </div>
                    ))
                  ) : (
                    <div className="bg-primary w-full px-3 py-2 rounded-lg shadow-lg text-white font-bold cursor-pointer hover:bg-gray-700 transition-colors"></div>
                  )}
                </div>
              </div>
              {/* Demografía del anime */}
              <div className="px-5 py-6 bg-secondary rounded-lg shadow-lg ">
                <h3 className="text-2xl text-white font-bold mb-3">
                  Demografía
                </h3>
                <div className="bg-primary px-3 py-2 rounded-lg shadow-lg text-white font-bold cursor-pointer hover:bg-gray-700 transition-colors">
                  {Object.keys(anime).length > 0 ? demographics[0].name : ""}
                </div>
              </div>
              <div className="px-5 py-6 bg-secondary rounded-lg shadow-lg ">
                <label
                  htmlFor="status"
                  className="text-2xl text-white font-bold mb-3"
                >
                  Actualmente?
                </label>
                <select
                  className="p-3 mt-2 block rounded-lg bg-primary w-full text-white outline-none"
                  id="status"
                  value={currently}
                  onChange={handleStatusChange}
                  name="status"
                >
                  <option value={1}>Viendo en emisión</option>
                  <option value={2}>Finalizado</option>
                </select>
              </div>
            </div>
            {/* Aquí se agregan los personajes favoritos */}
            <div className="w-full px-5 py-6 bg-secondary rounded-lg shadow-lg">
              <div className="flex">
                <div className="flex-1 w-56">
                  <h2 className="text-2xl text-white font-bold">
                    Personajes favoritos
                  </h2>
                </div>
                {/* Botón para abrir el modal y agregar personajes */}
                <div className="flex-2 w-auto">
                  <button
                    onClick={openModal}
                    className="px-3 py-2 bg-primary text-white font-bold hover:bg-gray-700 transition-colors rounded-lg shadow-lg"
                    disabled={isEnabled}
                    type="button"
                  >
                    Añadir personaje
                  </button>
                </div>
              </div>
              {/* Lista de los personajes favoritos agregados */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-4">
                {characters.length > 0 ? (
                  characters.map((character) => (
                    <div
                      key={character.mal_id}
                      onClick={() => {
                        setOpenConfirmation(true);
                        setDeleteCharacter(character);
                      }}
                    >
                      <Card
                        url={"#"}
                        pathImage={
                          character.images
                            ? character.images.jpg.image_url
                            : character.image
                        }
                        name={character.name}
                      />
                    </div>
                  ))
                ) : (
                  <div className="lg:col-span-4 text-white text-3xl text-center py-6 font-semibold">
                    No hay personajes favoritos agregados
                  </div>
                )}
              </div>
            </div>
            {/* Comentarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lo bueno */}
              <Textarea
                labelName="Lo bueno"
                defaultValue={theGood}
                id="good"
                name="good"
                rows={5}
              />
              {/* Lo malo */}
              <Textarea
                labelName="Lo malo"
                defaultValue={theBad}
                id="bad"
                name="bad"
                rows={5}
              />
            </div>
          </div>
        </div>
        <div className="w-full my-4">
          <div className="px-5 py-5 bg-secondary rounded-lg shadow-lg">
            <input
              className="w-full px-3 py-2 cursor-pointer text-white text-2xl font-bold bg-primary hover:bg-gray-700 transition-colors shadow-lg rounded-lg"
              type="submit"
              value="Guardar cambios"
            />
          </div>
        </div>
      </Form>
      <ModalAnimeCharacters
        setCharacters={setCharacters}
        characters={characters}
        setOpen={setOpen}
        open={open}
        anime={anime.mal_id}
      />
      <ConfirmDialog
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        characters={characters}
        setCharacters={setCharacters}
        deleteCharacter={deleteCharacter}
        setDeleteCharacter={setDeleteCharacter}
      />
    </>
  );
};

export default AnimeEdit;
