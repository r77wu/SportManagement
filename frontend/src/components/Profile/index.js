import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Summary from "./Summary/Summary";
import Detail from "./Detail/Detail";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    width: "calc(100vw - 200px)",
    top: "72px",
    left: "200px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      left: 0,
      width: "95vw",
    },
  },
}));
const Index = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        style={{ padding: "2em" }}
      >
        <Grid item lg={4} xs={12}>
          <Summary />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Detail />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Index;
