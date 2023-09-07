import { Link } from "react-router-dom";

const FormLogin = () => {
  return (
    <>
      <div className="mb-5">
        <label className="text-white text-xl font-bold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="text"
          id="email"
          name="email"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password">
          <div className="flex justify-between">
            <span className="text-white text-xl font-bold">Contraseña</span>
            <span className="text-white hover:text-gray-300 transition-colors font-bold cursor-pointer text-xl">
              <Link to="/forgot">¿No recuerdas la contraseña?</Link>
            </span>
          </div>
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="my-5">
        <div className="flex flex-row gap-1 align-middle content-center items-center">
          <input
            className="accent-blue-300 md:accent-blue-500 w-4 h-4 rounded-lg"
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
          />
          <label
            className="text-white font-bold cursor-pointer text-lg"
            htmlFor="rememberMe"
          >
            Recuérdame
          </label>
        </div>
      </div>
      <div className="mb-4">
        <input
          className="bg-primary hover:bg-gray-700 transition-colors cursor-pointer p-3 mt-2 block rounded-lg text-white uppercase font-bold w-full"
          type="submit"
          value="Iniciar sesión"
        />
      </div>
    </>
  );
};

export default FormLogin;
