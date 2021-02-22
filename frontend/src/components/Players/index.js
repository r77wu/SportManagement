import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Result from "./Result/Result";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    width: "calc(100vw - 200px)",
    top: "72px",
    left: "200px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      left: 0,
      width: "100vw",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Result />
    </Box>
  );
};

export default Index;
