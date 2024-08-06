import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  //form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // kaydol modundaysa: hesap olustur
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Your account has been created");
          navigate("/home");
        })
        .catch((err) => toast.error("An error occurred: " + err.code));
    } else {
      // giriş modundaysa: hesaba giris yap
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Logged into account");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("An error occurred: " + err.code);
          if (err.code === "auth/invalid-credential") setIsError(true);
        });
    }
  };

  // şifre sifirlama epostasi gönder
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Password reset email sent. Check your mail"))
      .catch((err) => toast.error("An error occurred" + err.code));
  };

  // google ile giris yap
  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Logged into account");
        navigate("/home");
      })
      .catch((err) => toast.error("An error occurred: " + err.code));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" />
        </div>

        <h1 className="text-lg font-bold text-center">Log in to Twitter</h1>

        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black  whitespace-nowrap"
        >
          <img className="h-[20px]" src="/google-logo.svg" />
          Log in with Google
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="text"
          />

          <label className="mt-5">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
          />

          <button className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Sign up" : "Log in"}
          </button>

          <p onClick={() => setIsSignUp(!isSignUp)} className="mt-5">
            <span className="text-gray-500">
              {isSignUp
                ? "If you have an account"
                : "If you don't have an account"}
            </span>
            <span className="ms-2 text-blue-500 cursor-pointer">
              {isSignUp ? "Log in" : "Sign up"}
            </span>
          </p>
        </form>

        {isError && (
          <p
            onClick={handleReset}
            className="text-red-500 text-center cursor-pointer"
          >
            Forgot your password?
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
