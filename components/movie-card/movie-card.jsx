import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} className="w-100" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Button onClick={() => onMovieClick(movie)}>Open</Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.prototype = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
