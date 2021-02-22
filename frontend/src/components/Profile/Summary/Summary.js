import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

import profilePic from "../../../assets/images/profile.jpg";

const useStyles = makeStyles((theme) => ({
  picContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "200px",
  },
  pic: {
    width: "75px",
    height: "75px",
    marginBottom: "1em",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Summary = ({ user }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Box className={classes.picContainer}>
          <Avatar
            src={profilePic}
            alt="pic"
            variant="circular"
            className={classes.pic}
          />
          <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
        </Box>
        <Divider />
      </CardContent>
      <CardActions className={classes.btnContainer}>
        <Button className={classes.btn} color="primary" disableRipple>
          Update Picture
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Summary);
