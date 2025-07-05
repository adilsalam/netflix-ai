import React from "react";
import { IMAGE_BASE_URL } from "../utils/constants";

const MovieCard = ({ imagePath }) => {
  if (!imagePath) return null;
  return (
    <div>
      <img
        className="w-28 md:w-50"
        src={IMAGE_BASE_URL + imagePath}
        alt="movie-card"
      />
    </div>
  );
};

export default MovieCard;
