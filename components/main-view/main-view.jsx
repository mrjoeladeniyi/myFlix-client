// import components from project
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Link, useParams } from "react-router-dom";


// import components from Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// internal data of component (For storing data and making API calls)
export const MainView = () => {
  // get user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem("user: user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movie, setMovies] = useState([]);

  // setting up the resting state as null until a movie is selected and displayed using the imported MovieView
  // const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-movies-api.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movies) => {
          return {
            id: movies._id,
            title: movies.title,
            image: movies.image_path,
            director: movies.director.name,
            genre: movies.genre.name,
            description: movies.description,
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movie/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movie.length === 0 ? (
                  <Col className="text">The list is empty!</Col>
                ) : (
                  <Col md={7} key={movie.id}>
                    <MovieView movie={movie} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Row>
                    <Col md={7} key={movie.id}>
                      <ProfileView className="justify-content-md-left" />
                    </Col>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Row>
                    <Col md={7} key={movie.id}>
                      <ProfileView className="justify-content-md-left" />
                    </Col>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movie.length === 0 ? (
                  <Col className="text">The list is empty!</Col>
                ) : (
                  <>
                    {movie.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>

    // <>
    //   <Row className="justify-content-md-center text">
    //     {!user ? (
    //       <Col md={5}>
    //         <LoginView onLoggedIn={(user) => setUser(user)} />
    //         <SignupView />
    //       </Col>
    //     ) : selectedMovie ? (
    //       <Col md={8}>
    //         <MovieView
    //           movie={selectedMovie}
    //           onBackClick={() => setSelectedMovie(null)}
    //         />
    //       </Col>
    //     ) : movie.length === 0 ? (
    //       <div>Movie list is empty!</div>
    //     ) : (
    //       <>
    //         {movie.map((movie) => (
    //           <Col key={movie.id} md={3} className="mb-5 text">
    //             <MovieCard
    //               // key={movie.id}
    //               movie={movie}
    //               //store the value of the movie click in newSelectedMovie
    //               onMovieClick={(newSelectedMovie) => {
    //                 // set the value of setSelectedMovies as the newSelectedMovie
    //                 setSelectedMovie(newSelectedMovie);
    //               }}
    //             />
    //           </Col>
    //         ))}
    //         <Row>
    //           <Col>
    //             <Button
    //               variant="danger"
    //               className="mb-5"
    //               // size="sm"
    //               onClick={() => {
    //                 setUser(null);
    //                 setToken(null);
    //                 localStorage.clear();
    //               }}
    //             >
    //               Logout
    //             </Button>
    //           </Col>
    //         </Row>
    //       </>
    //     )}
    //   </Row>
    // </>
  );
};
