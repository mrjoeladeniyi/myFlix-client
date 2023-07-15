import { MovieCard } from "../../movie-card/movie-card";
import { useEffect, useState } from "react";

export const FavoriteMoviesView = () => {
  const [favoriteMovie, setFavoriteMovies] = useState([]);
  const [movie, setMovies] = useState([]);
  let favoriteMovies = movie.filter((m) =>
    user.favorite_movies.includes(m._id)
  );

  if (favoriteMovie.length === 0) {
    return <>Favorite Movie list is empty!</>;
  } else {
    return (
      <div>
        <h2>Favorite Movies</h2>
        <MovieCard key={movie.favoriteMovies} movie={movie} />
      </div>
    );
  }
};
