const FormChangePassword = () => {
  return (
    <>
      <div className="mb-3">
        <label className="text-white text-2xl font-bold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="text"
          id="email"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="mb-3">
        <label className="text-white text-2xl font-bold" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="password"
          id="password"
        />
      </div>
      <div className="mb-10">
        <label
          className="text-white text-2xl font-bold"
          htmlFor="confirmPassword"
        >
          Confirmar contraseña
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="password"
          id="confirmPassword"
        />
      </div>
      <div className="mb-3">
        <input
          className="bg-primary hover:bg-gray-700 transition-colors cursor-pointer p-3 mt-2 block rounded-lg text-white uppercase font-bold w-full"
          type="submit"
          value="Cambiar contraseña"
        />
      </div>
    </>
  );
};

export default FormChangePassword;
