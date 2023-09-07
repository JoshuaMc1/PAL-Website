import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <main className="h-full">
        <div
          className="parallax h-auto py-10 md:py-20 md:h-full"
          style={{ backgroundImage: `url('/bg.svg')` }}
        >
          <div className="flex w-full h-full justify-center content-center items-center px-16 md:px-32 banner">
            <h1 className="text-4xl font-bold text-white w-full md:w-1/3">
              Crea tus listas de animes y personajes favoritos con nuestra
              aplicación web
            </h1>
            <div className="image-banner hidden md:block md:w-2/3">
              <img
                className="rounded-lg"
                src="/app.jpeg"
                alt="Imagen de la aplicación"
              />
            </div>
          </div>
        </div>
        <div className="container px-4 h-auto">
          <div className="flex w-full h-52 flex-col gap-4 justify-center content-center items-center">
            <h3 className="text-3xl text-center font-bold text-white">
              Regístrate ahora para comenzar
            </h3>
            <Link
              className="px-6 py-3 bg-secondary text-white font-semibold text-xl rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              to="/register"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
