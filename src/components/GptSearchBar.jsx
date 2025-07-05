import React, { useRef } from "react";
import ai from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchData = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearchClick = async () => {
    const query =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchData.current.value +
      ". Only give me names of 5 movies comma separated like the example result given ahead. Example Result: Drive, John Wick, The Godfather, Kung Fu Panda, Gravity";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
    });

    const geminiMovies = response.text.split(", ");
    const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addMovieResults({ movieNames: geminiMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-52 flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchData}
          className="bg-white px-6 py-4 m-4 col-span-9 rounded-md"
          type="text"
          placeholder="What do you want to watch today"
        />
        <button
          className="bg-red-500 px-4 py-4 m-4 col-span-3 rounded-md cursor-pointer"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
