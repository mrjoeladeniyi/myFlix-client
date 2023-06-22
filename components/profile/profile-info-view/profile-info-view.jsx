import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export const ProfileInfoView = ({ username, email }) => {
  // const [user, setUser] = useState("user");
  // const [username] = useState("");
  // const [email] = useState("");

  // const userName = useParams();
  // const users = user.find((user) => m.username === userName);
  return (
    <>
      <Card className="h-100" style={{ backgroundColor: "black" }}>
        <Card.Body>
          <Card.Title style={{ color: "wheat" }}>@{username}</Card.Title>
          <Card.Text>{email}</Card.Text>
          {/* <Link to={`/profile/${encodeURIComponent(users.username)}`}>
            <Button variant="primary">Open</Button>
          </Link> */}
        </Card.Body>
      </Card>
    </>
  );
};

ProfileInfoView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
