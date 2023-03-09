import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Card from "./Card";
import { searchCharacter } from "../api/characters";

const Modal = ({ open, setOpen, characters, setCharacters }) => {
  const [search, setSearch] = useState(""),
    [result, setResult] = useState([]),
    [pagination, setPagination] = useState({}),
    [page, setPage] = useState(1);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (search.length >= 3) {
      const consult = async () => {
        setResult([]);
        const data = await searchCharacter(search, page);
        setResult(data.data);
        setPagination(data.pagination);
      };
      consult();
    } else setResult([]);
  }, [search, page]);

  const handleSearch = () => {
    const input = document.querySelector("#searchModal");
    setSearch(input.value);
    setPage(1);
  };

  const handleCancel = () => {
    setOpen(false);
    setPage(1);
    setPagination({});

    setTimeout(() => {
      setResult([]);
      setSearch({});
    }, 350);
  };

  return (
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
                        <div>
                          <label
                            className="text-2xl font-bold text-white"
                            htmlFor="searchModal"
                          >
                            Buscar personaje
                          </label>
                          <div className="flex">
                            <input
                              className="p-3 mt-2 rounded-lg bg-secondary w-full text-white"
                              type="search"
                              placeholder="Busca el anime que quieres agregar"
                              id="searchModal"
                              list="search-list"
                              autoComplete="off"
                              onKeyUp={(e) =>
                                e.key === "Enter" && handleSearch()
                              }
                            />
                            <button
                              onClick={handleSearch}
                              className="w-32 mt-2 mx-3 bg-secondary text-white rounded-lg shadow-lg font-bold hover:bg-gray-700 transition-colors"
                            >
                              Buscar
                            </button>
                          </div>
                        </div>
                        {search.length >= 3 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
                            {result.map((c) => (
                              <div
                                key={c.mal_id}
                                onClick={() => {
                                  setCharacters([...characters, c]);
                                  setOpen(false);
                                  setResult([]);
                                  setSearch({});
                                  setPagination({});
                                  setPage(1);
                                }}
                              >
                                <Card
                                  url="#"
                                  pathImage={c.images.jpg.image_url}
                                  name={c.name}
                                  background="bg-secondary"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="container py-4">
                            <h1 className="text-center text-3xl font-bold text-white">
                              No hay resultados{" "}
                              <span className="block font-semibold text-xl text-gray-200">
                                (debes escribir al menos 3 caracteres)
                              </span>
                            </h1>
                          </div>
                        )}
                      </div>
                      {pagination.last_visible_page > 1 && (
                        <div className="container mt-4 p-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setPage(page - 1);
                              }}
                              disabled={
                                pagination.current_page == 1 ? true : false
                              }
                              className="py-2 px-3 bg-secondary text-white font-bold hover:bg-gray-700 transition-colors rounded-lg shadow-lg"
                            >
                              Anterior
                            </button>
                            <span className="py-2 px-3 bg-secondary text-white font-bold text-center rounded-lg shadow-lg cursor-default">
                              Pagina {pagination.current_page} de{" "}
                              {pagination.last_visible_page}
                            </span>
                            <button
                              onClick={() => {
                                setPage(page + 1);
                              }}
                              disabled={
                                pagination.current_page ==
                                pagination.last_visible_page
                                  ? true
                                  : false
                              }
                              className="py-2 px-3 bg-secondary text-white font-bold hover:bg-gray-700 transition-colors rounded-lg shadow-lg"
                            >
                              Siguiente
                            </button>
                          </div>
                        </div>
                      )}
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
  );
};

export default Modal;
