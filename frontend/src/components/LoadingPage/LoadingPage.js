import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CachedIcon from "@material-ui/icons/Cached";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: "50px",
  },
}));

const LoadingPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <CachedIcon className={classes.icon} />
    </Box>
  );
};

export default LoadingPage;
