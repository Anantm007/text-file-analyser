/* THE RESPONSE WILL TAKE SOME TIME TO LOAD.
 * Try it out: http://localhost:3000/tt8785426
 */
const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.get("/:movieId", async (req, res) => {
  // Initialise suggestedMovies
  let suggestedMovies = [];

  // Fetch details of original movie and push it into SUGGESTED MOVIES array only
  const originalMovie = await getFullDetailOfMovie(req.params.movieId);
  suggestedMovies.push(originalMovie);

  // Get Id's of suggested movies from heroku
  const suggestedMoviesPartial = await getSuggestedMoviesId(
    originalMovie.original_title
  );

  // Get full details of suggested movies by looping
  if (suggestedMoviesPartial !== undefined) {
    await suggestedMoviesPartial.map(async (movie) => {
      const movieDetail = await getFullDetailOfMovie(movie.Movie_Id);
      suggestedMovies.push(movieDetail);

      // Returning when array is full. * Do not change the below condition, code might break
      if (suggestedMovies.length > 18) {
        /*
         * IMPORTANT - You have your answer in "suggestedMovies"
         */
        return res.status(200).json(suggestedMovies);
      }
    });
  }
});

// Get full details of movie from 3rd party API
const getFullDetailOfMovie = async (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?&api_key=cfe422613b250f702980a3bbf9e90716`,
    { method: "GET" }
  ).then(async (response) => {
    return response.json();
  });
};

// Get Id's of suggested movies from heroku
const getSuggestedMoviesId = async (title) => {
  if (title) {
    return fetch(`https://bioscope-api.herokuapp.com/movie?title=${title}`, {
      method: "GET",
    }).then(async (response) => {
      return response.json();
    });
  }
};

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
