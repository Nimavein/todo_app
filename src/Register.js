import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  const [registrationData, setRegistrationData] = useState();
  // Request API.
  // Add your own code here to customize or restrict how the public can register new users.

  const handleFormChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    console.log(registrationData);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    axios
      .post("https://recruitment.ultimate.systems/auth/local/register", {
        username: registrationData.username,
        email: registrationData.email,
        password: registrationData.password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        history.push("/");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div>
      <h1>Register form</h1>
      <form onSubmit={(e) => handleRegistration(e, registrationData)}>
        <div>
          <label>
            Username:
            <input
              onChange={handleFormChange}
              required
              type="text"
              id="username"
            />
          </label>
          <label>
            E-mail:
            <input
              onChange={handleFormChange}
              required
              type="email"
              id="email"
            />
          </label>
          <label>
            Password:
            <input
              onChange={handleFormChange}
              required
              type="password"
              id="password"
            />
          </label>
        </div>

        <div className="register-form-buttons">
          <button>Create</button>
          <button type="button">Cancel</button>
        </div>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
};

export default Register;
