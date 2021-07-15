import React, { useState } from "react";
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
      console.log("resp", response);
      if (!response.data.user) {
        throw "Cannot login. Please try again.";
      }

      history.push("/to-do-lists");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("jwt");
    setJwt("");
  };

  return (
    <div>
      {errorMsg && <p>{errorMsg}</p>}
      <h1>Login form</h1>
      {!jwt && (
        <div>
          <form onSubmit={(e) => handleLogin(e, loginData)}>
            <div>
              <label>
                Username or email:
                <input
                  onChange={handleFormChange}
                  required
                  type="text"
                  id="identifier"
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

            <div className="login-form-buttons">
              <button>Login</button>
            </div>
          </form>
          <button>
            <Link to="/register">Register</Link>
          </button>
        </div>
      )}
      {jwt && (
        <div>
          <a onClick={handleLogout}>Logout</a>
          <Link to="/to-do-lists">to do lists</Link>
        </div>
      )}
    </div>
  );
};

export default Login;
