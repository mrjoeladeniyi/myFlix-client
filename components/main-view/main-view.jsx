import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovies] = useState([
    {
      id: 1,
      title: "Little Mermaid",
      description:
        "A young mermaid dreams of becoming human after falling in love with a prince she saves from drowning.",
      genre: ["Fantasy", "Romance", "Musical"],
      director: "Rob Marshall",
      poster_url:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/the-little-mermaid_rlpetcye_480x.progressive.jpg?v=1681237061",
    },
    {
      id: 2,
      title: "Godzilla",
      description:
        "A colossal creature, awakened by nuclear radiation, wreaks havoc on humanity as it battles other monstrous creatures for supremacy.",
      genre: ["Action", "Science Fiction"],
      director: "Gareth Edwards",
      poster_url:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/d474a8c08e6712380d223782f38f1dca_a7b93d73-1f47-45c2-a443-bfd6a7713e2b_480x.progressive.jpg?v=1573593675",
    },
    {
      id: 3,
      title: "Pirates of the Caribbean",
      description:
        "Captain Jack Sparrow embarks on thrilling adventures across the high seas, encountering supernatural foes, cursed treasures, and swashbuckling pirates.",
      genre: ["Action", "Adventure", "Fantasy"],
      director: "Gore Verbinski",
      poster_url:
        "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/c9d5fb11c495e731413c16f8ad6838e0_adc81f87-ccdf-4f98-8b7f-cdaa8884f515_480x.progressive.jpg?v=1573585499",
    },
  ]);

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

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
