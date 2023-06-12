// import necessary dependencies
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// internal data of component (For storing data and making API calls)
export const MainView = () => {
  // get user and token from local storage
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

  return (
    <>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movie.length === 0 ? (
          <div>Movie list is empty!</div>
        ) : (
          <>
            {movie.map((movie) => (
              <Col key={movie.id} md={3} className="mb-5">
                <MovieCard
                  // key={movie.id}
                  movie={movie}
                  //store the value of the movie click in newSelectedMovie
                  onMovieClick={(newSelectedMovie) => {
                    // set the value of setSelectedMovies as the newSelectedMovie
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <Row>
              <Col>
                <Button
                  variant="danger"
                  className="mb-5"
                  // size="sm"
                  onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Row>
    </>
  );
};
