import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import PersonPinIcon from "@material-ui/icons/PersonPin";

const useStyles = makeStyles((theme) => ({
  recordContainer: {
    width: 950,
    maxWidth: "100%",
    [theme.breakpoints.down("md")]: {
      width: 720,
      maxWidth: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: 450,
      maxWidth: "100%",
    },
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  winner: {
    position: "relative",
    transform: "skewX(-20deg)",
    backgroundColor: "#98df92",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      //transformOrgin: "bottom left",
      transform: "skewX(20deg) translateX(-4.5%)",
      backgroundColor: "#98df92",
      zIndex: "-1",
    },
  },
  loser: {
    position: "relative",
    transform: "skewX(-20deg)",
    backgroundColor: "#cb5151",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      //transformOrgin: "bottom left",
      transform: "skewX(20deg) translateX(4.5%)",
      backgroundColor: "#cb5151",
      zIndex: "-1",
    },
  },

  subHeadingContainer: {
    flexDirection: "column",
  },
  subHeading: {
    width: "100%",
    padding: "0.5em 0",
  },
  description: {
    textAlign: "start",
  },
  date: {
    textAlign: "start",
  },
}));

const MatchHistory = ({ matches, currUserFirstName, currUserLastName }) => {
  const classes = useStyles();
  const filteredMatches = matches.filter((match) => {
    const currentTime = new Date();
    const matchTime = new Date(+match.date);
    if (matchTime < currentTime && match.result != null) {
      return match;
    }
  });

  const [matchHistory, setMatchHistory] = useState(filteredMatches);
  const content = matchHistory.map((match) => {
    return (
      <Accordion key={match._id} className={classes.recordContainer}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className={`${classes.heading} ${classes.winner}`}>
            <Typography
              variant="h6"
              display="inline"
              style={{ paddingRight: "0.2em" }}
            >{`${match.result.winner.firstName} ${match.result.winner.lastName}`}</Typography>
            {match.result.winner.firstName === currUserFirstName &&
            match.result.winner.lastName === currUserLastName ? (
              <PersonPinIcon fontSize="small" />
            ) : null}
          </Box>
          <Box className={classes.heading}>
            <Typography variant="h6">{`${match.result.winningScore} : ${match.result.losingScore}`}</Typography>
          </Box>
          <Box className={`${classes.heading} ${classes.loser}`}>
            <Typography
              variant="h6"
              display="inline"
              style={{ paddingRight: "0.2em" }}
            >{`${match.result.loser.firstName} ${match.result.loser.lastName}`}</Typography>
            {match.result.loser.firstName === currUserFirstName &&
            match.result.loser.lastName === currUserLastName ? (
              <PersonPinIcon fontSize="small" />
            ) : null}
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.subHeadingContainer}>
          <Box className={`${classes.subHeading}`}>
            <Typography variant="h6">{`Title: ${match.title.toUpperCase()}`}</Typography>
          </Box>
          <Box className={`${classes.subHeading} ${classes.description}`}>
            <Typography variant="h6">Description:</Typography>
            <Typography variant="body1">{`${match.description}`}</Typography>
          </Box>
          <Box className={`${classes.subHeading} ${classes.date}`}>
            <Typography variant="h6">Date: </Typography>
            <Typography variant="subtitle1">{`${
              new Date(+match.date).toISOString().split("T")[0]
            }`}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  });
  return <CardContent>{content}</CardContent>;
};

const mapStateToProps = (state) => {
  return {
    currUserFirstName: state.auth.user.firstName,
    currUserLastName: state.auth.user.lastName,
    matches: state.auth.user.matches,
  };
};

export default connect(mapStateToProps)(MatchHistory);
