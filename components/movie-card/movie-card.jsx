import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" style={{ backgroundColor: "black" }}>
      <Card.Img variant="top" src={movie.image} className="w-100" />
      <Card.Body>
        <Card.Title style={{ color: "wheat" }}>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.prototype = {
  movie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
