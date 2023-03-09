const FormUserInformation = ({ token, dataUser }) => {
  return (
    <>
      <input type="hidden" name="_token" value={token} />
      <div className="w-full">
        <label className="text-lg font-bold text-white" htmlFor="name">
          Nombre
        </label>
        <input
          className="p-3 mt-2 block rounded-lg bg-primary w-full text-white shadow-lg outline-none"
          type="text"
          id="name"
          name="names"
          defaultValue={dataUser.names}
        />
      </div>
      <div className="w-full">
        <label className="text-lg font-bold text-white" htmlFor="surname">
          Apellido
        </label>
        <input
          className="p-3 mt-2 block w-full bg-primary text-white rounded-lg shadow-lg outline-none"
          type="text"
          id="surname"
          name="surnames"
          defaultValue={dataUser.surnames}
        />
      </div>
      <div className="mt-2 md:col-span-2">
        <label className="text-lg font-bold text-white" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="p-3 mt-2 block w-full bg-primary text-white rounded-lg shadow-lg outline-none"
          type="email"
          id="email"
          name="email"
          defaultValue={dataUser.email}
        />
      </div>
      <div className="mt-2 md:col-span-2">
        <label className="text-lg font-bold text-white" htmlFor="device">
          Dispositivo
        </label>
        <input
          className="p-3 mt-2 block w-full bg-primary text-white rounded-lg shadow-lg outline-none"
          id="device"
          type="text"
          defaultValue={dataUser.device}
          readOnly={true}
        />
      </div>
      <div className="mt-4 w-full md:col-span-2">
        <input
          className="w-full px-3 py-2 cursor-pointer text-white text-2xl font-bold bg-primary hover:bg-gray-700 transition-colors shadow-lg rounded-lg outline-none"
          type="submit"
          value="Guardar cambios"
        />
      </div>
    </>
  );
};

export default FormUserInformation;
