import { useEffect, useState } from "react";
import { getSeason } from "../../api/characters";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";

const SeasonNow = () => {
  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({}),
    [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await getSeason(page);
      setAnimeData(response.data);
      setPagination(response.pagination);
    };
    loadData();
    setLoading(false);
  }, [page]);

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between">
          <h1 className="text-4xl text-white font-bold mb-6">
            Animes de la temporada actual
          </h1>
          <div>
            {pagination.last_visible_page > 1 && (
              <div className="container">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setPage(page - 1);
                    }}
                    disabled={pagination.current_page == 1 ? true : false}
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
                      pagination.current_page == pagination.last_visible_page
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
        {loading ? (
          <div className="container h-96">
            <div className="flex h-full justify-center items-center">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
            {animeData.map((data) => (
              <Card
                key={data.mal_id}
                url={`/dashboard/view/${data.mal_id}/view`}
                pathImage={data.images.jpg.large_image_url}
                name={data.title}
                background="bg-secondary"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SeasonNow;
