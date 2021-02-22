import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Appointments,
  DateNavigator,
  TodayButton,
  Toolbar,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import Box from "@material-ui/core/Box";

import * as actions from "../../store/actions/index";
import bg from "../../assets/images/steven-skerritt-vljZeX-WdQs-unsplash.jpg";

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
  tooptipHeader: {
    backgroundImage: `url(${bg})`,
    height: 250,
    backgroundSize: "cover",
  },
  tooptipContent: {},
}));

// const SchedulerData = [
//   {
//     startDate: new Date(1608583414251),
//     endDate: new Date(+`${1608583414251 + 3600000 * 2}`),
//     title: "Junior Final",
//     players: ["mike", "john"],
//   },
//   {
//     startDate: "2021-02-02T12:00",
//     endDate: "2021-02-02T13:30",
//     title: "Senior Final",
//     players: ["mike", "john"],
//   },
// ];

const DashBoard = ({ matches, onFetchMatches }) => {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [schedulerData, setSchedulerData] = useState([]);
  useEffect(() => {
    const modifiedDate = matches.map((match) => ({
      startDate: new Date(+match.date),
      endDate: new Date(+`${+match.date + 3600000 * 2}`),
      title: match.title,
    }));
    setSchedulerData(modifiedDate);
  }, [matches]);

  const Header = (appointmentData, ...restProps) => {
    return (
      <AppointmentTooltip.Header
        {...restProps}
        appointmentData={appointmentData}
        className={classes.tooptipHeader}
      ></AppointmentTooltip.Header>
    );
  };

  return (
    <Box className={classes.container}>
      <Paper style={{ margin: "2em" }}>
        <Scheduler data={schedulerData}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={(currentDate) => setCurrentDate(currentDate)}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showCloseButton headerComponent={Header} />
        </Scheduler>
      </Paper>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMatches: () => {
      dispatch(actions.fetchMatches());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
