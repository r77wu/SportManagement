import * as actionTypes from "./types";
import axios from "axios";

const loadingPage = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

const logoutSuccess = (data) => {
  return {
    type: actionTypes.LOGOUT,
    data,
  };
};

const updateUserSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    data,
  };
};

const updateUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    const requestBody = {
      query: `
      query{
        login(email: "${email}", password: "${password}") {
          user {
            email
            firstName
            lastName
            age
            gender
            points
            role
            wins
            loses
            matches {
              _id
              title
              description
              date
              players {
                firstName
                lastName
              }
              result {
                winner {
                  firstName
                  lastName
                }
                loser {
                  firstName
                  lastName
                }
              }
            }
          }
          isLoggedIn
        }}
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => res.data)
      .then((data) => dispatch(authSuccess(data.data.login)))
      .catch((error) => dispatch(authFail(error)));
  };
};

export const isAuth = () => {
  return (dispatch) => {
    dispatch(loadingPage());
    const requestBody = {
      query: `query {
        isLoggedIn {
          user {
            email
            firstName
            lastName
            age
            gender
            points
            role
            wins
            loses
            matches {
              _id
              title
              description
              date
              players {
                firstName
                lastName
              }
              result {
                winner {
                  firstName
                  lastName
                }
                loser {
                  firstName
                  lastName
                }
                winningScore
                losingScore
              }
            }
          }
          isLoggedIn
        }
      }
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => res.data)
      .then((data) => dispatch(authSuccess(data.data.isLoggedIn)))
      .catch((error) => dispatch(authFail(error)));
  };
};

export const logout = () => {
  return (dispatch) => {
    const requestBody = {
      query: `query {
        logout {
          user {
            email
            
          }
          isLoggedIn
        }
      }
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => res.data)
      .then((data) => dispatch(logoutSuccess(data.data.logout)))
      .catch((error) => dispatch(authFail(error)));
  };
};

export const updateUser = (updateForm) => {
  return (dispatch) => {
    console.log(updateForm);
    const requestBody = {
      query: `
        mutation {
          updateUser( userInput: {email: "${updateForm.email}", firstName: "${updateForm.firstName}", lastName: "${updateForm.lastName}", age: ${updateForm.age}, gender: "${updateForm.gender}"}) {
          email
            firstName
            lastName
            age
            gender
        }
        }
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => {
        console.log(res.data.data.updateUser);
        dispatch(updateUserSuccess(res.data.data.updateUser));
      })
      .catch((error) => {
        dispatch(updateUserFail(error));
      });
  };
};
