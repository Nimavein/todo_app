import React from "react";
import { useGlobalContext } from "./context";
import { useHistory } from "react-router";
import logout from "./images/logout.png";
import Login from "./Login";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setJwt, setOrder } = useGlobalContext();
  const token = localStorage.getItem("jwt");
  const history = useHistory();
  const handleLogout = async () => {
    localStorage.removeItem("jwt");
    setJwt("");
    setOrder(false);
    history.push("/#/");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <p className="logo">ToDo-List</p>
      {token && (
        <div>
          <img
            alt="logout"
            className="logout-button"
            src={logout}
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
