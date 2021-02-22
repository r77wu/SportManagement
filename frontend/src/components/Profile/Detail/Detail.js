import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { CardActions } from "@material-ui/core";

import * as actions from "../../../store/actions/index";

const Detail = ({ user, onUpdateUser }) => {
  const initialState = {
    firstName: {
      label: "First Name",
      value: user.firstName,
      required: true,
      type: "test",
    },
    lastName: {
      label: "Last Name",
      value: user.lastName,
      required: true,
      type: "test",
    },
    gender: {
      label: "Gender",
      value: user.gender,
      onlyRead: true,
      type: "test",
    },
    age: {
      label: "Age",
      value: user.age,
      required: true,
      type: "number",
    },
    email: {
      label: "Email",
      value: user.email,
      required: true,
      type: "test",
    },
  };
  const [userInfo, setuserInfo] = useState(initialState);
  let infoArr = [];
  for (let key in userInfo) {
    infoArr.push({
      id: key,
      ...userInfo[key],
    });
  }

  const handleInputChange = (event, id) => {
    event.preventDefault();
    let inputValue;
    if (id === "age") {
      inputValue = +event.target.value;
    } else {
      inputValue = event.target.value;
    }
    setuserInfo((preState) => ({
      ...preState,
      [id]: {
        ...preState[id],
        value: inputValue,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let sumbitForm = {};
    for (let key in userInfo) {
      sumbitForm = {
        ...sumbitForm,
        [key]: userInfo[key].value,
      };
    }
    onUpdateUser(sumbitForm);
  };

  return (
    <Card>
      <CardHeader title="Personal Information" />
      <Divider />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          {infoArr.map((item) => (
            <Grid item key={item.id} lg={6} xs={12}>
              <TextField
                type={item.type}
                label={item.label}
                variant="outlined"
                required={item.required}
                disabled={item.onlyRead}
                value={item.value}
                fullWidth={true}
                margin="normal"
                onChange={(event) => handleInputChange(event, item.id)}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button disableRipple color="primary" onClick={handleSubmit}>
              Update
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUser: (updateForm) => {
      dispatch(actions.updateUser(updateForm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
