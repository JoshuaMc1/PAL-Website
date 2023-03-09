import React, { useState, useEffect } from "react";
import FormChangePasswordProfile from "../../components/FormChangePasswordProfile";
import Photo from "../../img/default.svg";
import { Form, useActionData, Navigate, redirect } from "react-router-dom";
import FormUserInformation from "../../components/FormUserInformation";
import {
  getUserData,
  updateProfile,
  changePassword,
  updateProfilePhoto,
  deleteUser,
} from "../../api/api";
import Alert from "../../components/Alert";

export async function action({ request }) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const formData = await request.formData(),
    data = Object.fromEntries(formData),
    errors = [],
    email = formData.get("email");

  if (!regex.test(email)) {
    errors.push({
      type: "danger",
      message: "El correo electrónico no es valido",
    });
    return errors;
  }

  if (Object.values(data).includes("")) {
    errors.push({
      type: "danger",
      message: "Todos los campos son obligatorios",
    });
    return errors;
  }

  const token = data._token;
  delete data._token;

  const response = await updateProfile(token, data);

  if (response.success) {
    errors.push({
      success: response.success,
      type: "success",
      message: response.message,
    });
    return errors;
  } else {
    errors.push({ type: "danger", message: response.message });
    return errors;
  }
}

const Profile = ({ token, setLoad }) => {
  const [photoName, setPhotoName] = useState(null),
    [photoPreview, setPhotoPreview] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [profileMessage, setProfileMessage] = useState({});
  const [changePasswordMessage, setChangePasswordMessage] = useState({
    type: "",
    message: "",
  });
  const response = useActionData();

  const getData = async () => {
    const data = await getUserData(token);

    if (data.success) {
      setDataUser(data.user);
      setLoad(true);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0],
      reader = new FileReader();

    setPhotoName(file.name);

    reader.onload = (e) => {
      setPhotoPreview(e.target.result);

      const updatePhoto = async () => {
        const formData = new FormData();
        formData.append("photo", file);

        const result = await updateProfilePhoto(token, formData);

        if (result.success) {
          const updateDataUser = async () => {
            const data = await getUserData(token);

            if (data.success) {
              setDataUser(data.user);
              setLoad(true);
            }
          };

          updateDataUser();
          setProfileMessage({
            type: "success",
            message: result.message,
          });
        } else {
          setProfileMessage({
            type: "danger",
            message: result.message,
          });
        }
      };

      updatePhoto();
    };

    reader.readAsDataURL(file);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const data = {
      current_password: event.target[0].value,
      password: event.target[1].value,
      password_confirmation: event.target[2].value,
    };

    if (Object.values(data).includes("")) {
      setChangePasswordMessage({
        type: "danger",
        message: "Todos los campos son obligatorios.",
      });
    }

    if (data.password !== data.password_confirmation) {
      setChangePasswordMessage({
        type: "danger",
        message: "Las contraseñas no coinciden.",
      });
    }

    const result = await changePassword(token, data);

    const errorString = Object.entries(result.message)
      .filter(([key, value]) => value)
      .map(([key, value]) => `-> ${key}: ${value}`)
      .join("\n");

    setChangePasswordMessage({
      type: "danger",
      message: errorString,
    });

    if (result.success) {
      setChangePasswordMessage({
        type: "success",
        message: errorString,
      });
    } else {
      setChangePasswordMessage({
        type: "danger",
        message: errorString,
      });
    }
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    const resp = confirm("Esta seguro que desea eliminar el usuario?");
    if (resp) {
      const response = await deleteUser(token);

      if (response.success) {
        getData();
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (response?.length > 0) {
      if (response[0].hasOwnProperty("success")) {
        delete response[0].success;
        getData();
      }
    }
  }, [response?.length > 0]);

  return (
    <>
      <div className="lg:flex gap-4">
        <div className="w-full lg:mb-0 lg:w-1/4">
          <div className="mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              name="photo"
              id="photo"
            />
            {Object.keys(profileMessage).length > 0 && (
              <Alert type={profileMessage.type}>{profileMessage.message}</Alert>
            )}
            <label
              className="block text-white text-2xl font-bold mb-2 text-center"
              htmlFor="photo"
            >
              Foto de perfil
            </label>
            <div className="text-center">
              {photoPreview ? (
                <div className="mt-2">
                  <span
                    className="block w-40 h-40 rounded-full m-auto shadow"
                    style={{
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundImage: `url(${photoPreview})`,
                    }}
                  />
                </div>
              ) : (
                <div className="mt-2">
                  <img
                    src={dataUser.photo === null ? Photo : dataUser.photo_url}
                    className="w-40 h-40 m-auto rounded-full shadow"
                  />
                </div>
              )}
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-primary rounded-lg font-semibold text-md text-white uppercase tracking-widest shadow-sm hover:bg-gray-700 transition ease-in-out duration-150 mt-4 ml-3"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Seleccionar Nueva Foto
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:mb-0 lg:w-3/4">
          <div className="mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">
              Información del usuario
            </h1>
            {response?.length > 0 && (
              <div className="my-4">
                <Alert type={response[0].type}>{response[0].message}</Alert>
              </div>
            )}
            <Form
              method="POST"
              className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4"
              noValidate
            >
              <FormUserInformation token={token} dataUser={dataUser} />
            </Form>
          </div>
          <div className="mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">
              Cambiar contraseña
            </h1>
            {changePasswordMessage?.message && (
              <div className="my-4" style={{ whiteSpace: "pre-line" }}>
                <Alert type={changePasswordMessage.type}>
                  {changePasswordMessage.message}
                </Alert>
              </div>
            )}
            <Form
              method="POST"
              onSubmit={handleChangePassword}
              className="flex flex-col"
              noValidate
            >
              <FormChangePasswordProfile />
            </Form>
          </div>
          <div className="mb-4 px-5 py-6 bg-secondary rounded-lg shadow-lg">
            <Form method="POST" onSubmit={handleDeleteUser} noValidate>
              <input
                type="submit"
                className="w-full px-3 py-2 cursor-pointer text-white text-2xl font-bold bg-red-800 hover:bg-red-900 transition-colors shadow-lg rounded-lg"
                value="Eliminar cuenta"
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
