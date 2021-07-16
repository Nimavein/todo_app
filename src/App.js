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
import { HashRouter } from "react-router-dom";

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

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <HashRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/to-do-lists">
          <TodosContainer />
        </PrivateRoute>
      </HashRouter>
    </Router>
  );
};

export default App;
