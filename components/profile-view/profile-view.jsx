import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const ProfileView = () => {
  // console.log(username);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth_date, setBirthdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [favoriteMovies, setFavoriteMovies] = useState("");

  // const data = {
  //   username: storedUser,
  //   token: storedToken,
  //   email: email,
  //   birthdate: birth_date,
  //   favorite_movies: favoriteMovies,
  // };

  // fetch from apis
  const userInfoRequest = () => {
    fetch(`https://myflix-movies-api.herokuapp.com/users/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      "Content-type": "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setBirthdate(new Date(data.birth_date).toISOString().split("T")[0]);
      })
      .catch((error) => console.log(error));
  };
  const editProfileRequest = (event) => {
    const username = storedUser.username;
    const formattedBirthdate = new Date(birth_date);

    const token = storedToken;
    event.preventDefault();
    // console.log("")
    fetch(`https://myflix-movies-api.herokuapp.com/users/${username}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${storedToken}` },
      "Content-type": "application/json",
      body: JSON.stringify({
        username,
        password,
        email,
        birth_date,
      }),
    })
      .then((response) => {
        console.log("user.birth_date", user.birth_date);
        if (!response.ok) {
          throw new Error(`HTTP error: status: ${response.status}`);
        } else {
          localStorage.setItem("user", JSON.stringify(user));
          alert("Profile updated successfully");
          const storedUser = JSON.parse(localStorage.getItem("user"));
          storedUser.username = user.username;
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
      }),
      [token];
  };

  console.log("ALL STATE", username, password, email, birth_date);
  // const deleteProfileRequest = fetch(
  //   `https://myflix-movies-api.herokuapp.com/users/${user}`,
  //   {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` },
  //   }
  // );
  console.log("DATe", new Date().toISOString().split("T")[0]);

  console.log("birth_date", birth_date);

  console.log("user", user);

  console.log;

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="date"
          value={birth_date}
          onChange={(event) => setBirthdate(event.target.value)}
        />
      </label>
      <button type="submit" onClick={editProfileRequest}>
        Update profile
      </button>
    </form>
  );

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   fetch("https://myflix-movies-api.herokuapp.com/users", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       // const usersFromApi = data.map((user) => {
  //       return {
  //         id: user._id,
  //         username: user.username,
  //         password: user.password,
  //         email: user.email,
  //         birthdate: user.birth_date,
  //         favoriteMovies: user.favorite_movies,
  //       };
  //       // });
  //       // setUser(usersFromApi);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [token]);

  // return (
  //   <>
  //     username={user.username} email={user.email};
  //   </>
  // );
};
