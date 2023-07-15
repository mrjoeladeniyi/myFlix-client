// Handle delete
export const ProfileDeleteView = () => {
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  fetch(`https://myflix-movies-api.herokuapp.com/users/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      alert("Profile deleted");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.open("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
