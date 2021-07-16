import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const { jwt, setJwt } = useGlobalContext();

  const handleFormChange = (e) => {
    setLoginData({
      ...loginData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const response = await axios.post(
        "https://recruitment.ultimate.systems/auth/local",
        {
          identifier: loginData.identifier,
          password: loginData.password,
        }
      );
      setJwt(response.data.jwt);
      localStorage.setItem("jwt", response.data.jwt);
      if (!response.data.user) {
        throw "Cannot login. Please try again.";
      }

      history.push("/to-do-lists");
    } catch (err) {
      setErrorMsg(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [errorMsg]);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={(e) => handleLogin(e, loginData)}>
        <h1 className="login-title">Login</h1>
        <div className="login-inputs">
          <input
            className="identifier-login-input"
            onChange={handleFormChange}
            required
            type="text"
            id="identifier"
            placeholder="Username or email:"
          />

          <input
            className="password-login-input"
            onChange={handleFormChange}
            required
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        {errorMsg && <p className="invalid-data">Invalid login data</p>}
        <div className="login-form-buttons">
          <button className="login-button">Login</button>
        </div>
        <p className="or-text">or</p>
        <button className="register-button">
          <Link to="/register">create an account</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
