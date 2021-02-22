import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import { Hidden } from "@material-ui/core";

import * as actions from "../../store/actions/index";
import logo from "../../assets/images/LogoMakr-0p1jW6.png";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "space-between",
  },
  logo: {
    width: "60px",
    height: "60px",
  },
  btn: {
    color: theme.palette.common.myWhite,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const Nav = ({ onDrawerOpen, onLogout }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar classes={{ root: classes.container }}>
          <Box>
            <Hidden lgUp>
              <Button
                disableRipple
                className={classes.btn}
                onClick={onDrawerOpen}
              >
                <MenuIcon fontSize="large" />
              </Button>
            </Hidden>
            <Button
              disableRipple
              className={classes.btn}
              component={Link}
              to="/home"
            >
              <img src={logo} alt="logo" className={classes.logo} />
            </Button>
          </Box>
          <Button
            className={classes.btn}
            disableRipple
            onClick={() => onLogout()}
          >
            <ExitToAppIcon fontSize="large" />
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Nav);
