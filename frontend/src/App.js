import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import ProjectedRoute from "./utils/ProjectedRoute";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import * as actions from "./store/actions/index";

function App(props) {
  const { isLoggedIn, onAuth, loading } = props;
  useEffect(() => {
    onAuth();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <ProjectedRoute path="/home" component={Home} isAuth={isLoggedIn} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: () => {
      dispatch(actions.isAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
