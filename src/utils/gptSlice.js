import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptMode: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addMovieResults: (state, actions) => {
      const { movieNames, movieResults } = actions.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptMode, addMovieResults } = gptSlice.actions;
export default gptSlice.reducer;
