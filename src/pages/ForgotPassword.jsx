import { Form, Link } from "react-router-dom";
import FormForgotPassword from "../components/FormForgotPassword";

const ForgotPassword = ({ token }) => {
  return (
    <div className="my-40 flex justify-center items-center">
      <div className="bg-secondary p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl uppercase font-bold text-white mb-5 text-center">
          Recuperar contraseña
        </h1>

        <Form>
          <FormForgotPassword />
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

export default ForgotPassword;
