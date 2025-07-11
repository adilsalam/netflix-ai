import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGptMode } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gpt = useSelector((store) => store.gpt);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptClick = () => {
    dispatch(toggleGptMode());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className=" absolute w-full z-50 bg-gradient-to-b from-black flex flex-col md:flex-row justify-between items-center">
      <img className="w-44 mx-36 my-2" src={LOGO} alt="logo" />
      {user && (
        <div className="flex align-middle">
          <button
            onClick={handleGptClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md m-2 cursor-pointer"
          >
            {gpt.showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-10 h-10 m-2" src={USER_AVATAR} alt="user-icon" />
          <button
            className="bg-red-500 text-white rounded-md px-2 py-1 m-2 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
