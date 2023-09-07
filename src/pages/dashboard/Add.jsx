import { useState, useEffect } from "react";
import { Form, useActionData, useLoaderData, Navigate } from "react-router-dom";
import { addList, getAnime as loadAnimeApi } from "../../api/api";
import { searchAnime, getAnime, getCharacter } from "../../api/characters";
import Rate from "../../components/Rate";
import Card from "../../components/Card";
import ModalAnimeCharacters from "../../components/ModalAnimeCharacters";
import NoImage from "../../img/no-img.png";
import Input from "../../components/Input";
import ConfirmDialog from "../../components/ConfirmDialog";
import Textarea from "../../components/Textarea";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

export function loader({ params }) {
  if (params.slug) {
    return {
      search: true,
      slug: params.slug,
    };
  }
  return {
    search: false,
    slug: null,
  };
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

  const character = data.characters.split(","),
    token = data.token,
    characterArray = [],
    animeArray = [];

  if (character.length > 3) {
    const firstThree = character.slice(0, 2);
    const remaining = character.slice(2);

    const firstThreePromises = firstThree.map((ch) => getCharacter(ch));

    await Promise.all(firstThreePromises).then((results) => {
      results.forEach((result) => {
        characterArray.push({
          mal_id: result.data.mal_id,
          name: result.data.name,
          name_kanji: result.data.name_kanji,
          image: result.data.images.jpg.image_url,
        });
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 3100));

    remaining.map(async (ch) => {
      const fullCharacter = await getCharacter(ch);
      characterArray.push({
        mal_id: fullCharacter.data.mal_id,
        name: fullCharacter.data.name,
        name_kanji: fullCharacter.data.name_kanji,
        image: fullCharacter.data.images.jpg.image_url,
      });

      await new Promise((resolve) => setTimeout(resolve, 3100));
    });
  } else {
    character.map(async (ch) => {
      const fullCharacter = await getCharacter(ch);
      characterArray.push({
        mal_id: fullCharacter.data.mal_id,
        name: fullCharacter.data.name,
        name_kanji: fullCharacter.data.name_kanji,
        image: fullCharacter.data.images.jpg.image_url,
      });

      await new Promise((resolve) => setTimeout(resolve, 3100));
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await getAnime(data.anime);

  animeArray.push({
    mal_id: response.data.mal_id,
    title: response.data.title,
    title_japanese: response.data.title_japanese,
    episodes: response.data.episodes,
    synopsis: response.data.synopsis,
    airing: response.data.airing,
    image: response.data.images.jpg.image_url,
    genres: response.data.genres,
    demographics: response.data.demographics,
    trailer: response.data.trailer,
    relations: response.data.relations,
    rating: response.data.rating,
    studios: response.data.studios,
    season: response.data.season,
    status: response.data.status,
    year: response.data.year,
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
    anime: { ...animeArray[0] },
    characters: characterArray,
  };

  const save = await addList(token, newData);

  if (!save.success) {
    errors.push({
      type: "danger",
      message: save.message,
    });

    return errors;
  }

  errors.push({
    success: true,
    message: "El anime se a guardado exitosamente...",
    slug: save.slug,
  });

  return errors;
}

const Add = ({ token }) => {
  const [open, setOpen] = useState(false),
    [openConfirmation, setOpenConfirmation] = useState(false),
    [anime, setAnime] = useState({}),
    [characters, setCharacters] = useState([]),
    [search, setSearch] = useState(""),
    [result, setResult] = useState([]),
    [genres, setGenres] = useState([]),
    [demographics, setDemographics] = useState([]),
    [deleteCharacter, setDeleteCharacter] = useState({}),
    [generalRating, setGeneralRating] = useState(0),
    [animationRating, setAnimationRating] = useState(0),
    [historyRating, setHistoryRating] = useState(0),
    [charactersRating, setCharactersRating] = useState(0),
    [musicRating, setMusicRating] = useState(0),
    [isEnabled, setIsEnabled] = useState(true),
    [isRedirect, setIsRedirect] = useState(false),
    [isSaving, setIsSaving] = useState(false),
    [saveSlug, setSaveSlug] = useState("");

  const errors = useActionData();
  const slug = useLoaderData();

  const openModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (errors?.length > 0) {
      const response = errors[0];

      setIsSaving(false);

      if (response.success) {
        setSaveSlug(response.slug);
        setIsRedirect(true);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (search.length >= 3) {
      const consult = async () => {
        setResult([]);
        const data = await searchAnime(search);
        setResult(data.data);
      };
      consult();
    } else setResult([]);
  }, [search]);

  useEffect(() => {
    if (slug.search) {
      const loadAnime = async () => {
        if (!parseInt(slug.slug)) {
          const response = await loadAnimeApi(token, slug.slug);

          if (response.success) {
            setAnime(response.data);
            setResult([]);
            setSearch("");
            setGenres(response.data.genres);
            setIsEnabled(false);
            if (response.data.demographics.length > 0) {
              setDemographics(response.data.demographics);
            } else setDemographics([{ name: "none" }]);
          }
        } else {
          const response = await getAnime(slug.slug);

          setAnime(response.data);
          setResult([]);
          setSearch("");
          setGenres(response.data.genres);
          setIsEnabled(false);
          if (response.data.demographics.length > 0) {
            setDemographics(response.data.demographics);
          } else setDemographics([{ name: "none" }]);
        }
      };

      loadAnime();
    }
  }, [slug]);

  useEffect(() => {
    if (Object.keys(anime).length > 0) {
      if (Object.keys(characters).length > 4) {
        setIsEnabled(true);
      }
    }
  }, [characters]);

  const handleSearch = () => {
    const input = document.querySelector("#search");
    setSearch(input.value);
  };

  return (
    <>
      {isSaving && (
        <div className="absolute top-1/2 left-1/2 transform">
          <Spinner text="Guardando en la lista..." />
        </div>
      )}
      {isRedirect && (
        <Navigate
          to={`/dashboard/view/${saveSlug}/show/created`}
          replace={true}
        />
      )}
      {/* Buscador de anime */}
      <div
        className={`mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg ${
          isSaving && "opacity-25"
        }`}
      >
        <label className="text-white text-2xl font-bold" htmlFor="search">
          Buscar anime
        </label>
        <div className="flex">
          <input
            className="p-3 mt-2 rounded-lg bg-primary w-full text-white outline-none"
            type="search"
            placeholder="Busca el anime que quieres agregar"
            id="search"
            list="search-list"
            autoComplete="off"
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="w-32 mt-2 mx-3 bg-primary text-white rounded-lg shadow-lg font-bold hover:bg-gray-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
      {Object.keys(result).length > 0 && (
        <div className="bg-secondary p-3 rounded-lg shadow-lg mb-4">
          <h1 className="text-xl text-white font-bold mb-4">
            Resultados de la búsqueda
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {result.map((res) => (
              <div
                onClick={() => {
                  setAnime(res);
                  setResult([]);
                  setSearch("");
                  setGenres(res.genres);
                  setIsEnabled(false);
                  if (res.demographics.length > 0) {
                    setDemographics(res.demographics);
                  } else setDemographics([{ name: "none" }]);
                }}
                className=""
                key={res.mal_id}
              >
                <Card
                  pathImage={res.images.jpg.large_image_url}
                  name={res.title}
                  url={"#"}
                  enabledHover={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {errors?.length > 0 && (
        <Alert type={errors[0]?.type}>{errors[0]?.message}</Alert>
      )}
      <Form method="POST" noValidate>
        <input type="hidden" name="token" defaultValue={token} />
        <input
          type="hidden"
          name="anime"
          defaultValue={Object.keys(anime).length > 0 ? anime.mal_id : ""}
        />
        {Object.keys(characters).length > 0 ? (
          <input
            type="hidden"
            name="characters"
            defaultValue={characters.map((character) => character.mal_id)}
          />
        ) : (
          <input type="hidden" name="characters" defaultValue={""} />
        )}
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
        {/* Contenedor del formulario */}
        <div className={`lg:flex gap-4 ${isSaving && "opacity-25"}`}>
          <div className="w-full lg:mb-0 lg:w-1/4 space-y-4 mb-4">
            {/* Poster del anime */}
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
            {/* Calificación general */}
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Calificación General
              </h2>
              <div className="text-center">
                <Rate rating={generalRating} setRating={setGeneralRating} />
              </div>
            </div>
            {/* Calificación de la animación */}
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Animación
              </h2>
              <div className="text-center">
                <Rate rating={animationRating} setRating={setAnimationRating} />
              </div>
            </div>
            {/* Calificación de la historia */}
            <div className="bg-secondary p-3 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center text-white font-bold">
                Historia
              </h2>
              <div className="text-center">
                <Rate rating={historyRating} setRating={setHistoryRating} />
              </div>
            </div>
            {/* Calificación de la personajes */}
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
            {/* Calificación de la música */}
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
            {/* Nombre/titulo del anime */}
            <Input
              labelName="Nombre del anime"
              inputType="text"
              placeholder="Nombre del anime"
              defaultValue={anime.title || ""}
              id="title"
              readOnly={true}
            />
            {/* Sinopsis del anime */}
            <Textarea
              labelName="Sinopsis"
              id="synopsis"
              defaultValue={
                Object(anime.synopsis).length > 0 ? anime.synopsis : ""
              }
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
                  name="status"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="1">Viendo en emisión</option>
                  <option value="2">Finalizado</option>
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
                  characters.map((c) => (
                    <div
                      key={c.mal_id}
                      onClick={() => {
                        setOpenConfirmation(true);
                        setDeleteCharacter(c);
                      }}
                    >
                      <Card
                        url={"#"}
                        pathImage={c.images.jpg.image_url}
                        name={c.name}
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
              <Textarea labelName="Lo bueno" id="good" name="good" rows={5} />
              {/* Lo malo */}
              <Textarea labelName="Lo malo" id="bad" name="bad" rows={5} />
            </div>
          </div>
        </div>
        {/* Botón para guardar el anime y agregarlo a la lista */}
        <div className={`w-full my-4 ${isSaving && "opacity-25"}`}>
          <div className="px-5 py-5 bg-secondary rounded-lg shadow-lg">
            <input
              className="w-full px-3 py-2 cursor-pointer text-white text-2xl font-bold bg-primary hover:bg-gray-700 transition-colors shadow-lg rounded-lg"
              type="submit"
              value=" Guardar en la lista"
              onClick={() => {
                window.scrollTo(0, 0);
                setIsSaving(true);
              }}
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

export default Add;
