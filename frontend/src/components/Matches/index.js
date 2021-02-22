import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import MatchHistory from "./MatchHistory/MatchHistory";
import { CardContent } from "@material-ui/core";
import UpcomingMatches from "./UpcomingMatch/UpcomingMatch";

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
  switchMenu: {
    padding: "0 2em",
    display: "flex",
    justifyContent: "space-between",
  },
  switchBtn: {
    fontSize: "12px",
    backgroundColor: theme.palette.primary.light,
    //color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const Index = () => {
  const classes = useStyles();
  const [menu, setMenu] = useState(0);

  const handleSwitchHistory = () => {
    setMenu(0);
  };

  const handleSwitchUnpcoming = () => {
    setMenu(1);
  };

  return (
    <Box className={classes.container}>
      <Card style={{ margin: "1em 0 " }}>
        <CardHeader
          title={menu === 0 ? "Matches History" : "Upcoming Matches"}
        />
        <CardActions className={classes.switchMenu}>
          <Button className={classes.switchBtn} onClick={handleSwitchHistory}>
            Matches History
          </Button>
          <Button className={classes.switchBtn} onClick={handleSwitchUnpcoming}>
            Upcoming Matches
          </Button>
        </CardActions>
        <CardContent>
          {menu === 0 ? <MatchHistory /> : <UpcomingMatches />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Index;
