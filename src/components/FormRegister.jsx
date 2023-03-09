const FormRegister = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2">
      <div className="mb-4">
        <label className="text-white text-2xl font-bold" htmlFor="name">
          Nombre
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="text"
          id="name"
          name="names"
          placeholder="Juan"
        />
      </div>
      <div className="mb-4">
        <label className="text-white text-2xl font-bold" htmlFor="lastName">
          Apellido
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white border-none outline-none"
          type="text"
          id="lastName"
          name="surnames"
          placeholder="Hernandez"
        />
      </div>
      <div className="md:col-span-2 mb-4">
        <label className="text-white text-2xl font-bold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white outline-none"
          type="email"
          id="email"
          name="email"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="mb-4">
        <label className="text-white text-2xl font-bold" htmlFor="password">
          Contraseña
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white outline-none"
          type="password"
          id="password"
          name="password"
        />
      </div>
      <div className="mb-4">
        <label
          className="text-white text-2xl font-bold"
          htmlFor="confirmPassword"
        >
          Confirmar contraseña
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white outline-none"
          type="password"
          id="confirmPassword"
          name="cpassword"
        />
      </div>
      <div className="mb-4 md:col-span-2">
        <input
          className="bg-primary hover:bg-slate-600 transition-colors cursor-pointer p-3 mt-2 block rounded-lg text-white uppercase font-bold w-full"
          type="submit"
          value="Crear cuenta"
        />
      </div>
    </div>
  );
};

export default FormRegister;
