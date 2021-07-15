import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Register from "./Register";
import TodosContainer from "./TodosContainer";

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem("jwt");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.hasOwnProperty("jwt") === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              headers: { Authorization: `Bearer ${token}` },
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/to-do-lists">
          <TodosContainer />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
