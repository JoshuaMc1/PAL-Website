import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-primary py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-200">
            Lo sentimos, no hemos podido encontrar la página que busca.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/"}
              className="rounded-lg bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-700 transition-colors"
            >
              Regresar a inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Error404;
