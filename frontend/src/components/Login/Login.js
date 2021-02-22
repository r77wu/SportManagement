import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import * as actions from "../../store/actions/index";
import logo from "../../assets/images/LogoMakr-0p1jW6.png";
import bg from "../../assets/images/dennis-cortes-RezSc80WIVc-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    minWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    marginBottom: "2rem",
    color: theme.palette.common.myWhite,
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  container: {
    width: "50rem",
    height: "30rem",
    position: "relative",
    backgroundColor: theme.palette.primary.dark,
    boxSizing: "border-box",
    borderRadius: "15px",
    color: theme.palette.common.myWhite,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "25rem",
      height: "28rem",
    },
  },
  split: {
    width: "50%",
    height: "100%",
    position: "absolute",
  },
  left: {
    top: "0",
    left: "0",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  right: {
    top: "0",
    right: "0",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  logoContainer: {
    textAlign: "center",
    margin: "2rem",
  },
  logo: {
    width: "75px",
    height: "75px",
  },
  inputField: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  icon: {
    fontSize: "30px",
    marginRight: "1rem",
    transform: "translateY(50%)",
  },
  loginBtn: {
    width: "40%",
    fontSize: "20px",
    backgroundColor: theme.palette.primary.light,
    margin: "1rem 0",
    color: theme.palette.common.myWhite,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:active": {
      transform: "Scale(0.98)",
    },
  },
  signupBtn: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  bgContainer: {
    height: "100%",
  },
  bg: {
    width: "100%",
    height: "100%",
    borderBottomRightRadius: "15px",
    borderTopRightRadius: "15px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { isLoggedIn, onLogIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onLogIn(email, password);
  };

  return (
    <div className={classes.loginPage}>
      <Typography variant="h3" className={classes.title}>
        Welcome to <span style={{ fontStyle: "italic" }}>Edges & Net</span>
      </Typography>
      <div className={classes.container}>
        <div className={`${classes.split}  ${classes.left}`}>
          <form onSubmit={handleSubmitForm}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.inputField}>
              <EmailIcon className={classes.icon} />
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                color="secondary"
                value={email}
                onChange={(event) => handleEmailInput(event)}
              />
            </div>
            <div className={classes.inputField}>
              <VpnKeyIcon className={classes.icon} />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                color="secondary"
                value={password}
                onChange={(event) => handlePasswordInput(event)}
              />
            </div>
            <Button type="submit" className={classes.loginBtn} disableRipple>
              Log In
            </Button>
            <p>
              Don't have an account?{" "}
              <Button className={classes.signupBtn} disableRipple>
                Register
              </Button>
            </p>
          </form>
        </div>
        <div className={`${classes.split}  ${classes.right}`}>
          <div className={classes.bgContainer}>
            <img src={bg} alt="background" className={classes.bg} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (email, password) => {
      dispatch(actions.login(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
