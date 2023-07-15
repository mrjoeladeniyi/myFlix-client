import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoView } from "../profile-info-view/profile-info-view";
import { FavoriteMoviesView } from "../favorite-movies-view/favorite-movies";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap";
import Col from "react-bootstrap";

export const ProfileView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-movies-api.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(() => {
        // const usersFromApi = data.map((user) => {
        return {
          id: user._id,
          username: user.username,
          password: user.password,
          email: user.email,
          birthdate: user.birth_date,
          favoriteMovies: user.favorite_movies,
        };
        // });
        // setUser(usersFromApi);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  return (
    <>
      username={user.username} email={user.email};
    </>
  );
};
