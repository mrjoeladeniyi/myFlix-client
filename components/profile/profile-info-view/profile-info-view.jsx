import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ProfileUpdateView } from "../profile-update-view/profile-update-view";

export const ProfileInfoView = ({ user, username, email }) => {
	console.log(username);
	// const [user, setUser] = useState("user");
	// const [username] = useState("");
	// const [email] = useState("");

	// const userName = useParams();
	// const users = user.find((user) => m.username === userName);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Card
				className="h-100"
				style={{ backgroundColor: "none", border: "none" }}
			>
				<Card.Body>
					<Card.Title style={{ color: "wheat", fontSize: "14px" }}>
						@{username}
					</Card.Title>
					<Card.Text style={{ color: "white", fontSize: "12px" }}>
						{email}
					</Card.Text>
					<Link to="/edit-profile">
						<Button variant="warning" size="sm" onClick={handleShow}>
							Edit Profile
						</Button>
						<p></p>
						<Button variant="danger" size="sm">
							Delete Profile
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</>
	);
};

ProfileInfoView.propTypes = {
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};
