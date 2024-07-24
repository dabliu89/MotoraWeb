import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import TextModal from "../../app/components/Modal/TextModal/TextModal";


export default function Register() {
  const { data } = useSession();
  const router = useRouter();
  const { callbackUrl } = router.query;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obrigatório.")
      .min(3, "O nome precisa ter pelo menos 3 letras."),
    email: Yup.string()
      .email("Endereço de e-mail inválido.")
      .required("Campo obrigatório."),
    password: Yup.string()
      .min(6, "A senha precisa ter pelo menos 6 caracteres.")
      .required("Campo obrigatório."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas precisam ser idênticas.")
      .required("Campo obrigatório."),
    checkLGPD: Yup.boolean()
      .oneOf(
        [true],
        "Você precisa confirmar que concorda com os termos antes de prosseguir."
      )
      .required(
        "Você precisa confirmar que concorda com os termos antes de prosseguir."
      ),
  });

  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const alertModal = (
    <TextModal
      close={() => {
        setShowAlertModal(false);
        Router.push(
          "/login" + (callbackUrl ? "?callbackUrl=" + callbackUrl : "")
        );
      }}
      body={
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-lg flex flex-col mt-5 gap-2">
            <span
              className="material-icons text-6xl"
              style={{ color: "#0EA5E9" }}
            >
              mail
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: "#0C4A6E" }}
            >
              Conta criada com sucesso!
            </span>
            <span className="text-sm text-gray-400 text-justify mb-2">
              Para ter acesso a sua conta, através do e-mail, confirme a criação
              da mesma.
            </span>
            <button
              onClick={() => {
                Router.push(
                  "/login" + (callbackUrl ? "?callbackUrl=" + callbackUrl : "")
                );
              }}
              className="px-6 py-2 text-white rounded-full w-full transition durantion-200 hover:opacity-80 font-semibold"
              style={{ backgroundColor: "#0C4A6E" }}
            >
              Continuar
            </button>
          </div>
        </div>
      }
    />
  );

  async function handleCreateAccount(values: { name: any; email: any; password: any; confirmPassword?: string; checkLGPD?: boolean; }) {
    if (!values) return;
    const { name, email, password } = values;
    try {
      setLoad(true);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);
      await updateProfile(user, { displayName: name });
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `${window.location.origin}`,
      })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
      setErrorMessageVisible(true);
    } finally {
      setLoad(false);
    }
  }

  const [load, setLoad] = useState(false);

  const [errorMessageVisible, setErrorMessageVisible] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckboxClick = () => {
    setErrorMessageVisible(false);
  };

  const autofillStyles = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-text-fill-color: #000 !important;
    }
  `;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {showAlertModal && alertModal}
      <div className="w-5/6 rounded-lg flex flex-col flex-wrap justify-around items-center text-center">
        <span
          className="font-bold text-3xl mb-4"
          style={{ color: "#0C4A6E" }}
        >
          Cadastro
        </span>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            checkLGPD: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateAccount(values);
          }}
        >
          <Form className="w-full max-w-md mx-auto -mt-3">
            <div className=" flex flex-col justify-center items-center">
              <div className="w-full flex">
                <span
                  className="ml-4"
                  style={{ color: "#0C4A6E" }}
                >
                  Nome
                </span>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <Field
                type="text"
                name="name"
                className="placeholder-gray-500 w-full px-4 py-2 border border-gray-200 rounded-full ring-0 outline-none text-gray-900 placeholder:text-xs"
                placeholder="Qual o seu nome?"
              />
              <style>{autofillStyles}</style>
              <div className="w-11/12 h-6 text-red-400 flex justify-start">
                <ErrorMessage name="name" className="mt-1" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-full flex">
                <span
                  className="ml-4"
                  style={{ color: "#0C4A6E" }}
                >
                  E-mail
                </span>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <Field
                type="email"
                name="email"
                className="placeholder-gray-500 w-full px-4 py-2 border border-gray-200 rounded-full ring-0 outline-none text-gray-900 placeholder:text-xs"
                placeholder="Qual seu endereço eletrônico?"
              />
              <style>{autofillStyles}</style>
              <div className="w-11/12 h-6 text-red-400 flex justify-start">
                <ErrorMessage name="email" className="mt-1" />
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <div className="relative w-full">
                <div className="w-full flex">
                  <span
                    className="ml-4"
                    style={{ color: "#0C4A6E" }}
                  >
                    Senha
                  </span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="placeholder-gray-500 w-full px-4 py-2 border border-gray-200 rounded-full ring-0 outline-none text-gray-900 placeholder:text-xs"
                  placeholder="Adicione uma senha."
                />
                <div
                  className="absolute right-3 top-8 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <div className="w-10 flex justify-end items-end mt-1">
                      <span
                        className="material-icons"
                        style={{ color: "#0EA5E9" }}
                      >
                        visibility
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 flex justify-end items-end mt-1">
                      <span
                        className="material-icons"
                        style={{ color: "#0EA5E9" }}
                      >
                        visibility_off
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-11/12 h-6 text-red-400 flex justify-start">
                <ErrorMessage name="password" className="mt-1" />
              </div>
            </div>

            <div className="mb-2 flex flex-col justify-center items-center">
              <div className="relative w-full">
                <div className="w-full flex">
                  <span
                    className="ml-4"
                    style={{ color: "#0C4A6E" }}
                  >
                    Confirmar senha
                  </span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="placeholder-gray-500 w-full px-4 py-3 border border-gray-200 rounded-full ring-0 outline-none text-gray-900 placeholder:text-xs"
                  placeholder="Repita a senha adicionada."
                />
                <div
                  className="absolute right-3 top-8 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <div className="w-10 flex justify-end items-end mt-1">
                      <span
                        className="material-icons"
                        style={{ color: "#0EA5E9" }}
                      >
                        visibility
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 flex justify-end items-end mt-1">
                      <span
                        className="material-icons"
                        style={{ color: "#0EA5E9" }}
                      >
                        visibility_off
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-11/12 h-6 text-red-400 flex justify-start">
                <ErrorMessage name="confirmPassword" className="mt-1" />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-3 text-white rounded-full w-full transition durantion-200 hover:opacity-80 font-semibold"
                style={{
                  backgroundColor: "#0C4A6E",
                }}
              >
                {load ? (
                  <span className="animate-pulse">Criar conta</span>
                ) : (
                  "Criar conta"
                )}
              </button>
            </div>
          </Form>
        </Formik>
        <button
          className="text-gray-400 px-4 py-3 font-semibold"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
