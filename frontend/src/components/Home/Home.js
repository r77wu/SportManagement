import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import SideBar from "../SideBar/SideBar";
import Players from "../Players/index";
import Profile from "../Profile/index";
import Matches from "../Matches/index";
import DashBoard from "../DashBoard/DashBoard";
import * as actions from "../../store/actions/index";

const Home = ({ onFetchMatches }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    onFetchMatches();
  }, []);
  return (
    <div>
      <Nav onDrawerOpen={() => setDrawerOpen(true)} />
      <SideBar
        isDrawerOpen={drawerOpen}
        onDrawerClose={() => setDrawerOpen(false)}
      />
      <Switch>
        <Route path="/home" exact component={DashBoard} />
        <Route path="/home/profile" exact component={Profile} />
        <Route path="/home/players" exact component={Players} />
        <Route path="/home/matches" exact component={Matches} />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMatches: () => {
      dispatch(actions.fetchMatches());
    },
  };
};

export default connect(null, mapDispatchToProps)(Home);
