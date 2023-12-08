import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MovieCard = ({ movie, token, setUser, user }) => {
	const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);

	useEffect(() => {
		if (user.favorite_movies && user.favorite_movies.includes(movie.id)) {
			setIsFavoriteMovie(true);
		}
	}, [user]);

	// const AddToFavorite = (event) => {
	// 	event.preventDefault();
	// 	setIsFavoriteMovie(true);
	// 	console.log(user.favorite_movies[0]);
	// };

	const AddToFavorite = () => {
		fetch(
			`https://myflix-movies-api.herokuapp.com/users/${user.username}/${movie.id}`,
			{ method: "POST", headers: { Authorization: `Bearer ${token}` } }
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					console.log("Failed to add fav movie");
				}
			})
			.then((user) => {
				if (user) {
					alert("successfully added to favorites");
					localStorage.setItem("user", JSON.stringify(user));
					setUser(user);
					setIsFavoriteMovie(true);
				}
			})
			.catch((error) => {
				alert(error);
			});
	};

	const RemoveFavorite = () => {
		fetch(
			`https://myflix-movies-api.herokuapp.com/users/${user.username}/${movie.id}`,
			{ method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert("Failed to delete fav movie");
				}
			})
			.then((user) => {
				if (user) {
					alert("successfully deleted");
					localStorage.setItem("user", JSON.stringify(user));
					setUser(user);
					setIsFavoriteMovie(false);
				}
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<Card className="h-100" style={{ backgroundColor: "black" }}>
			<Card.Img variant="top" src={movie.image} className="w-100" />
			<Card.Body>
				<Card.Title style={{ color: "wheat" }}>{movie.title}</Card.Title>
				<Card.Text>{movie.author}</Card.Text>
				<Link to={`/movie/${encodeURIComponent(movie.id)}`}>
					<Button variant="primary">Open</Button>
				</Link>
				{isFavoriteMovie ? (
					<Button onClick={RemoveFavorite}>Remove from favorite</Button>
				) : (
					<Button onClick={AddToFavorite}>Add to favorite</Button>
				)}
			</Card.Body>
		</Card>
	);
};

MovieCard.prototype = {
	movie: PropTypes.shape({
		title: PropTypes.string,
	}).isRequired,
};
