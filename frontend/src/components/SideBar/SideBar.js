import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import PersonIcon from "@material-ui/icons/Person";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

import profilePic from "../../assets/images/profile.jpg";

const useStyles = makeStyles((theme) => ({
  desktopDrawer: {
    width: "200px",
    height: "calc(100vh - 72px)",
    top: "72px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2em 0",
  },
  profilePic: {
    width: "75px",
    height: "75px",
    marginBottom: "1em",
  },
}));

const SideBar = ({ isDrawerOpen, onDrawerClose, firstName, lastName }) => {
  const classes = useStyles();
  const location = useLocation();
  const items = useMemo(() => {
    return [
      {
        index: 0,
        href: "/home",
        icon: <DashboardIcon />,
        title: "Dashboard",
      },
      {
        index: 1,
        href: "/home/profile",
        icon: <PersonIcon />,
        title: "Profile",
      },
      {
        index: 2,
        href: "/home/players",
        icon: <GroupIcon />,
        title: "Players",
      },
      {
        index: 3,
        href: "/home/matches",
        icon: <EmojiEventsIcon />,
        title: "Matches",
      },
      {
        index: 4,
        href: "/home/settings",
        icon: <SettingsIcon />,
        title: "Settings",
      },
    ];
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    items.forEach((item) => {
      if (item.href === location.pathname) {
        setSelectedIndex(item.index);
      }
    });
  }, [location.pathname, items]);

  const content = (
    <React.Fragment>
      <Box className={classes.profileContainer}>
        <Avatar
          src={profilePic}
          alt="pic"
          variant="circular"
          className={classes.profilePic}
        />
        <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
      </Box>
      <Divider style={{ marginBottom: "10px" }} />
      {
        <Tabs
          orientation="vertical"
          value={selectedIndex}
          indicatorColor="primary"
        >
          {items.map((item) => (
            <Tab
              icon={item.icon}
              label={item.title}
              key={item.index}
              component={Link}
              to={item.href}
              disableRipple
            />
          ))}
        </Tabs>
      }
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Hidden mdDown>
        <Drawer
          classes={{ paper: classes.desktopDrawer }}
          variant="persistent"
          open
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgUp>
        <Drawer open={isDrawerOpen} onClose={onDrawerClose}>
          {content}
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName,
  };
};

export default connect(mapStateToProps)(SideBar);
