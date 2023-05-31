// import necessary dependencies
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// internal data of component (For storing data and making API calls)
export const MainView = () => {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://myflix-movies-api.herokuapp.com/movies/")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            image: movie.image_path,
            director: movie.director.name,
            genre: movie.genre.name,
            description: movie.description,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);
  // setting up the resting state as null until a movie is selected and displayed using the imported MovieView
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movie.length === 0) {
    return <div>Movie list is empty!</div>;
  }
  // looping through the array of movies and return object based on imported MovieCard
  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          //store the value of the movie click in newSelectedMovie
          onMovieClick={(newSelectedMovie) => {
            // set the value of setSelectedMovies as the newSelectedMovie
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
