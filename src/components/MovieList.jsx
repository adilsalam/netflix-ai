import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;

  return (
    <div className="py-6 pl-16">
      <p className="text-2xl pb-4 font-semibold text-white">{title}</p>
      <div
        className="flex gap-3.5 overflow-x-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {movies.map((movie) => (
          <div className="shrink-0" key={movie.id}>
            <MovieCard imagePath={movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
