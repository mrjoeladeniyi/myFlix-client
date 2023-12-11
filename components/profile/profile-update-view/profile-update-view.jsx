import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// TODO create handleEdit and handleDelete in ProfileView and pass them down as props to ProfileInfoView and ProfileDeleteView

export const ProfileUpdateView = ({


}) => {
   const storedUser = JSON.parse(localStorage.getItem("user"));
 const storedToken = localStorage.getItem("token");

   const [user, setUser] = useState(storedUser ? storedUser : null);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
   const [token, setToken] = useState(storedToken ? storedToken : null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      username: currentUsername,
      password: currentPassword,
      email: currentEmail,
    };

    fetch(`https://myflix-movies-api.herokuapp.com/users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        alert("Changes Saved");
        localStorage.setItem("user", currentUsername);
        localStorage.setItem("token", token);
        localStorage.window.open("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-3 mb-5 text">
        <Form.Group>
          <Form.Label as="h2">Edit Profile</Form.Label>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            required
            minLength="3"
            placeholder="Enter username"
            style={{ color: "black", backgroundColor: "azure" }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            style={{ color: "black", backgroundColor: "azure" }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            required
            style={{ color: "black", backgroundColor: "azure" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Form>
    </>
  );
};
