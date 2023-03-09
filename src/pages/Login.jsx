import { Form, Link, useActionData, Navigate } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import Alert from "../components/Alert";
import { login } from "../api/api";
import useSuccess from "../hook/useSuccess";
import { useEffect } from "react";

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

  const response = await login(data);

  if (response.success) {
    return response;
  } else {
    errors.push(response.message);
    return errors;
  }
}

const Login = ({ token, addToken }) => {
  const response = useActionData();
  const isSuccess = useSuccess(response);

  useEffect(() => {
    if (isSuccess) {
      addToken(response.token);
    }
  }, [isSuccess]);

  return (
    <div className="my-24 flex justify-center items-center flex-col">
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
          Acceda a su cuenta
        </h1>
        <Form method="POST" noValidate>
          <FormLogin />
        </Form>
        <div className="mb-4">
          <span className="text-lg text-white font-bold">
            Aun no tienes cuenta?{" "}
            <Link to="/register" className="hover:underline cursor-pointer">
              Regístrate
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
