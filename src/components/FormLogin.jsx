import { Link } from "react-router-dom";

const FormLogin = () => {
  return (
    <>
      <div className="mb-5">
        <label className="text-white text-2xl font-bold" htmlFor="email">
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
        <label className="text-white text-2xl font-bold" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="mb-5 float-right">
        <Link
          to="/forgot"
          className="text-white font-bold cursor-pointer text-lg hover:underline"
        >
          Recuperar contraseña
        </Link>
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
