import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Arrow1 from "./images/Arrow1.png";

const Register = () => {
  const history = useHistory();
  const [registrationData, setRegistrationData] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFormChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (registrationData.password === registrationData.confirmPassword) {
      axios
        .post(
          "https://thingproxy.freeboard.io/fetch/https://recruitment.ultimate.systems/auth/local/register",
          {
            username: registrationData.username,
            email: registrationData.email,
            password: registrationData.password,
          }
        )
        .then((response) => {
          history.push("/");
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
        });
    } else {
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    if (localStorage.hasOwnProperty("jwt") === true) {
      history.push("/to-do-lists");
    }
  }, [history]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMsg(null);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [errorMsg]);

  return (
    <div className="register-page">
      <form
        className="register-form"
        onSubmit={(e) => handleRegistration(e, registrationData)}
      >
        <div className="back-arrow">
          <Link to="/">
            <img src={Arrow1} alt="back" />
          </Link>
        </div>

        <h1 className="register-form-title">Create a new account</h1>
        <div className="register-inputs">
          <input
            className="username-register-input"
            onChange={handleFormChange}
            required
            type="text"
            id="username"
            placeholder="Username"
          />

          <input
            className="email-register-input"
            onChange={handleFormChange}
            required
            type="email"
            id="email"
            placeholder="Email"
          />

          <input
            className="password-register-input"
            onChange={handleFormChange}
            required
            type="password"
            id="password"
            placeholder="Password"
          />

          <input
            className="repeat-password-register-input"
            onChange={handleFormChange}
            required
            type="password"
            id="confirmPassword"
            placeholder="Repeat password"
          />
        </div>
        {errorMsg && <p className="invalid-data">Invalid registration data</p>}

        <div className="register-form-buttons">
          <button className="create-account-button">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
