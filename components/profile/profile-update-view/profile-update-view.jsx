import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../../movie-card/movie-card";
import Modal from "react-bootstrap/Modal";

// TODO create handleEdit and handleDelete in ProfileView and pass them down as props to ProfileInfoView and ProfileDeleteView

export const ProfileUpdateView = ({
	user,
	movies,
	setUser,
	token,
	onLoggedOut,
}) => {
	// const storedUser = JSON.parse(localStorage.getItem("user"));
	// const storedToken = localStorage.getItem("token");

	// const [user, setUser] = useState(storedUser ? storedUser : null);

	useEffect(() => {
		if (!user && !user.user) {
			// If user or user.user is not defined yet, return a loading state or redirect
			return <p>Loading...</p>;
		}
	}, [user.user]);

	const { username: initialUsername, email: initialEmail } = user.user;
	console.log("Initial username:", initialUsername);

	const [username, setUsername] = useState(initialUsername);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState(initialEmail);
	// const [token, setToken] = useState(storedToken ? storedToken : null);
	// const [name, setName] = useState(username);
	// const [password, setPassword] = useState(user.password);
	// const [email, setEmail] = useState(user.email);
	// const [birthday, setBirthday] = useState(user.birthday);
	console.log(username);
	// console.log(user.password);
	console.log("UserToken", token);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = (event) => {
		// this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			username: username,
			password: password,
			email: email,
		};

		// const handleEdit = (updatedUserData) => {
		// 	setUser(updatedUserData);
		// };
		if (!user || !user.user) {
			// If user or user.user is not defined yet, return a loading state or redirect
			return <p>Loading...</p>;
		}

		fetch(
			`https://myflix-movies-api.herokuapp.com/users/${user.user.username}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}
		)
			.then((response) => {
				if (response.ok) {
					console.log(response);
					alert("Changes Saved");
					return response.json();
				} else {
					alert("Changes failed");
				}
			})
			.then((updatedUser) => {
				if (updatedUser) {
					// localStorage.setItem("user", JSON.stringify(updatedUser));
					// console.log("updatedUser", updatedUser);
					// localStorage.setItem("token", updatedUser.token);

					// console.log(updatedUser);
					// // handleEdit(updatedUser);
					// setUser(updatedUser);
					// console.log(user);
					localStorage.setItem("user", JSON.stringify(updatedUser));
					localStorage.setItem("token", updatedUser.token);

					// Update the state in the parent component using the prop function
					setUser(updatedUser);
					user(setUser);
					setUsername(updatedUser.username);
					onLoggedOut();

					console.log("updatedUser", updatedUser);
				}
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
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter password"
						required
						style={{ color: "black", backgroundColor: "azure" }}
					/>
				</Form.Group>
				<Form.Group className="mb-2">
					<Form.Label>Email:</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
