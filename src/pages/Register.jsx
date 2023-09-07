import { useEffect } from "react";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { register } from "../api/api";
import useSuccess from "../hook/useSuccess";
import FormRegister from "../components/FormRegister";
import Alert from "../components/Alert";

export async function action({ request }) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [],
    email = formData.get("email");

  if (!regex.test(email)) {
    errors.push("El correo electrónico no es valido");
    return errors;
  }

  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
    return errors;
  }

  if (data.password !== data.cpassword) {
    errors.push("Las contraseñas no coinciden.");
    return errors;
  }

  const response = await register(data);

  return response;
}

const Register = ({ token, addToken }) => {
  const response = useActionData();
  const isSuccess = useSuccess(response);

  useEffect(() => {
    if (isSuccess) {
      addToken(response.token);
    }
  }, [isSuccess]);

  return (
    <div className="my-24 flex justify-center items-center">
      {token && <Navigate to={"/dashboard"} />}
      <div className="z-10 absolute top-20 left-50">
        {!isSuccess &&
          response?.length &&
          response.map((error, i) => (
            <Alert key={i} type="danger">
              {error}
            </Alert>
          ))}
      </div>
      <div className="bg-secondary p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl uppercase font-bold text-white mb-5 text-center">
          Crear una cuenta
        </h1>
        <Form method="POST" noValidate>
          <FormRegister />
        </Form>
        <div className="mb-4">
          <span className="text-lg text-white font-bold">
            Ya tienes cuenta?{" "}
            <Link to="/login" className="hover:underline cursor-pointer">
              Inicia sesión
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
