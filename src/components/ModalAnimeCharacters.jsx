import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getCharactersAnime } from "../api/characters";
import { generateId } from "../helpers/helpers";
import Card from "./Card";

const ModalAnimeCharacters = ({
  open,
  setOpen,
  characters,
  setCharacters,
  anime,
}) => {
  const [result, setResult] = useState([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (anime != null && open) {
      const searchCharacters = async () => {
        const response = await getCharactersAnime(anime);

        setResult(response.data);
      };

      searchCharacters();
    }
  }, [open]);

  const handleCancel = () => {
    setOpen(false);

    setTimeout(() => {
      setResult([]);
    }, 350);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-primary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                  <div className="bg-primary px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-3xl font-bold leading-6 text-center text-white mb-6"
                        >
                          Agregar personaje favorito
                        </Dialog.Title>
                        <div className="mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
                            {result?.length > 0 &&
                              result.map((character) => (
                                <div
                                  key={
                                    character.character.mal_id + generateId()
                                  }
                                  onClick={() => {
                                    const characterExists = characters.find(
                                      (c) =>
                                        c.mal_id === character.character.mal_id
                                    );

                                    if (
                                      !characterExists &&
                                      characters.length < 5
                                    ) {
                                      setCharacters([
                                        ...characters,
                                        character.character,
                                      ]);
                                    }

                                    setOpen(false);
                                    setResult([]);
                                  }}
                                >
                                  <Card
                                    url="#"
                                    pathImage={
                                      character.character.images.jpg.image_url
                                    }
                                    name={character.character.name}
                                    background="bg-secondary"
                                  />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent front-bold bg-red-800 px-4 py-2 text-base font-medium text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm mb-4"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ModalAnimeCharacters;
