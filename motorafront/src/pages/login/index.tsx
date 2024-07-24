/* eslint-disable @next/next/no-img-element */

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useState } from "react";


export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { callbackUrl } = query;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: (callbackUrl as string) || "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);


  const router = useRouter();
  const { callbackUrl } = router.query;

  function handleSignInWithGoogle() {
    signIn("google");
  }

  async function handleSignInWithCredentials() {
    try {
      setLoad(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `${window.location.origin}`,
      });
      if (callbackUrl) Router.push(callbackUrl as string);
      else Router.push("/");
      Router.reload();
    } catch (err) {
      setLoad(false);
      if (!email || !password) {
        setMessage("Os campos precisam ser preenchidos.");
      } else {
        setMessage("Usuário e/ou senha incorreta.");
      }
    } finally {
      setLoad(false);
    }
  }

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
    <div className="h-screen flex">
      <div className=" m-auto">
        <div className="w-full flex justify-center">
          <img
            src={"/images/logo/logo.png"}
            alt="logo"
            className="w-64 object-contain"
          />
        </div>
        <div className="flex flex-col justify-center w-full max-w-md px-4  bg-white rounded-lg sm:px-6 md:px-8 lg:px-10">
          <div className="mt-8">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <div className="flex items-center rounded-full text-sm border my-4 w-full font-medium">
                  <div className="w-12 flex justify-end items-end">
                    <div className="w-12 flex justify-end items-end">
                      <Mail color={"#297A4E"} />
                    </div>
                  </div>
                  <input
                    type="text"
                    id="sign-in-email"
                    className="border-none rounded-full text-sm placeholder-gray-500 p-4 w-full font-medium ring-0 outline-none text-gray-900"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <style>{autofillStyles}</style>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex relative">
                <div
                  className={`flex items-center border rounded-full text-sm border-${"border-cyan-900"
                    } mb-2 w-full font-medium`}
                >
                  <div className="w-12 flex justify-end items-end">
                    <div className="w-12 flex justify-end items-end">
                      <Lock color={"#297A4E"} />
                    </div>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="sign-in-password"
                    placeholder="Senha"
                    className="border-none rounded-full text-sm placeholder-gray-500 p-4 w-full font-medium ring-0 outline-none text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSignInWithCredentials();
                      }
                    }}
                  />
                  <div
                    className={`flex items-center border rounded-full text-sm border-${"border-cyan-900"
                      } mb-2 w-full font-medium`}
                  >
                    {showPassword ? (
                      <div className="w-10 flex justify-end items-end">
                        <EyeOff color={"#297A4E"} />
                      </div>
                    ) : (
                      <div className="w-10 flex justify-end items-end">
                        <Eye color={"#297A4E"} />
                      </div>
                    )}

                  </div>
                </div>
              </div>
              <div className=" w-full">
                {message && <p className="text-red-500">{message}</p>}
                <div className="flex items-center mb-4 ">
                  <div className="flex ml-auto">
                    <div
                      className="inline-flex text-xs font-light duration-200 underline underline-offset-1 cursor-pointer sm:text-sm hover:opacity-80"
                      style={{ color: "#0c6e40" }}
                      onClick={() => {
                        const auth = getAuth();
                        if (!email) return alert("Digite seu e-mail.");

                        sendPasswordResetEmail(auth, email);
                        alert("Verifique o e-mail: " + email);
                      }}
                    >
                      Esqueceu sua senha?
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleSignInWithCredentials()}
                  className="py-3 w-full flex itens-center justify-center rounded-full mb-3 mt-4 font-sans text-lg font-bold text-white duration-200 hover:opacity-80 cursor-pointer"
                  style={{
                    backgroundColor: "#0c6e40",
                  }}
                >
                  {load ? (
                    <span className="animate-pulse">Entrar</span>
                  ) : (
                    "Entrar"
                  )}
                </div>
                <button
                  className="border p-3 w-full rounded-full"
                  style={{ borderColor: "#0c6e40" }}
                  onClick={() =>
                    Router.push(
                      "/register" +
                      (callbackUrl ? "?callbackUrl=" + callbackUrl : "")
                    )
                  }
                >
                  <span
                    className="text-white font-semibold"
                    style={{ color: "#0c6e40" }}
                  >
                    Criar conta
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}