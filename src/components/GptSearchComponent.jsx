import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearchComponent = () => {
  return (
    <div className="">
      <div className="fixed -z-30">
        <img src={BG_URL} />
        <div className="bg-black opacity-50 absolute inset-0 "></div>
      </div>
      <GptSearchBar />
      <GptSuggestions />
    </div>
  );
};

export default GptSearchComponent;
