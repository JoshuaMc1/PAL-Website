import { Form } from "react-router-dom";
import FormChangePassword from "../components/FormChangePassword";

const ChangePassword = () => {
  return (
    <div className="my-24 flex justify-center items-center">
      <div className="bg-secondary p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl uppercase font-bold text-white mb-5 text-center">
          Cambio de contraseña
        </h1>
        <Form>
          <FormChangePassword />
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
