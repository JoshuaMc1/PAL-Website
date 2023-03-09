const FormChangePasswordProfile = () => {
  return (
    <>
      <div className="mt-4">
        <label className="text-lg font-bold text-white" htmlFor="passwd">
          Contraseña actual
        </label>
        <input
          className="p-3 mt-2 block w-full text-white bg-primary rounded-lg shadow-lg outline-none"
          type="password"
          id="passwd"
          name="current_password"
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-bold text-white" htmlFor="newPassword">
          Nueva contraseña
        </label>
        <input
          className="p-3 mt-2 block w-full text-white bg-primary rounded-lg shadow-lg outline-none"
          type="password"
          id="newPassword"
          name="new_password"
        />
      </div>
      <div className="mt-4">
        <label className="text-lg font-bold text-white" htmlFor="passwdConfirm">
          Confirmar nueva contraseña
        </label>
        <input
          className="p-3 mt-2 block w-full text-white bg-primary rounded-lg shadow-lg outline-none"
          type="password"
          id="passwdConfirm"
          name="new_password"
        />
      </div>
      <div className="mt-4">
        <input
          className="w-full px-3 py-2 cursor-pointer text-white text-2xl font-bold bg-primary hover:bg-gray-700 transition-colors shadow-lg rounded-lg"
          type="submit"
          value="Cambiar contraseña"
        />
      </div>
    </>
  );
};

export default FormChangePasswordProfile;
