import { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const message = validateData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/914ad279-199e-4095-9c10-2409dc9e5e1b/web/IN-en-20250519-TRIFECTA-perspective_8f1ca896-9e49-4a4e-90f0-22fc49650bd9_large.jpg"
          alt="bg-image"
        />
        <div className="bg-black opacity-50 absolute inset-0"></div>
      </div>
      <form
        method="POST"
        onSubmit={(e) => e.preventDefault()}
        className="bg-black/80 text-white rounded-md w-3/12 p-12 absolute my-36 mx-auto right-0 left-0"
      >
        <div className=" font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </div>
        {!isSignIn && (
          <input
            ref={name}
            className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
            type="text"
            name="name"
            id=""
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
          type="text"
          name="email"
          placeholder="Email Address"
        />
        <input
          ref={password}
          className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
          type="password"
          name="Password"
          placeholder="Password"
        />
        <p className="text-red-600 font-bold py-2">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="bg-red-600 rounded-sm p-2 my-3 w-full cursor-pointer"
          type="submit"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn
            ? "New to Netflix? Sign Up Now"
            : "Already a Member? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
