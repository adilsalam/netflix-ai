import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
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
      <form className="bg-black/80 text-white rounded-md w-3/12 p-12 absolute my-36 mx-auto right-0 left-0">
        <div className=" font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </div>
        {!isSignIn && (
          <input
            className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
            type="text"
            name="name"
            id=""
            placeholder="Full Name"
          />
        )}
        <input
          className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
          type="text"
          name="email"
          id=""
          placeholder="Email Address"
        />
        <input
          className=" rounded-sm p-3 my-3 bg-gray-700/80 w-full"
          type="password"
          name="Password"
          id=""
          placeholder="Password"
        />
        <button
          className="bg-red-600 rounded-sm p-2 my-3 w-full "
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
