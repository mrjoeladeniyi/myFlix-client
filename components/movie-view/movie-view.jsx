import React from "react";
import "./movie-view.scss";
import { Link, useParams } from "react-router-dom";
export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  const movies = movie.find((m) => m.id === movieId);
  return (
    <div className="text">
      <div>
        <img src={movies.image} />
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Title: </span>
        <span>{movies.title}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Description: </span>
        <span>{movies.description}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Genre: </span>
        <span>{movies.genre}</span>
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Director: </span>
        <span>{movies.director}</span>
      </div>
      <Link to="/">
        <button className="back-button" style={{ cursor: "pointer" }}>
          Back
        </button>
      </Link>
    </div>
  );
}; 
