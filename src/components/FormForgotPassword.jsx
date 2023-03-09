const FormForgotPassword = () => {
  return (
    <>
      <div className="mb-5">
        <label className="text-white text-2xl font-bold" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white outline-none"
          type="email"
          id="email"
          placeholder="name@gmail.com"
        />
      </div>
      <div className="mb-4">
        <input
          className="bg-primary hover:bg-slate-600 transition-colors cursor-pointer p-3 mt-2 block rounded-lg text-white uppercase font-bold w-full"
          type="submit"
          value="Enviar solicitud"
        />
      </div>
    </>
  );
};

export default FormForgotPassword;
