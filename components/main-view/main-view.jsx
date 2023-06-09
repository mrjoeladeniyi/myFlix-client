// import necessary dependencies
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

// internal data of component (For storing data and making API calls)
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movie, setMovies] = useState([]);
  // setting up the resting state as null until a movie is selected and displayed using the imported MovieView
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-movies-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
