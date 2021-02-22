import * as actionTypes from "./types";
import axios from "axios";

const fetchMatchesStart = () => {
  return {
    type: actionTypes.FETCH_MATCHES_START,
  };
};

const fetchMatchesSuccess = (data) => {
  return {
    type: actionTypes.FETCH_MATCHES_SUCCESS,
    data,
  };
};

const fetchMatchesFail = (error) => {
  return {
    type: actionTypes.FETCH_PLAYERS_FAIL,
    error,
  };
};

export const fetchMatches = () => {
  return (dispatch) => {
    dispatch(fetchMatchesStart());
    const requestBody = {
      query: `query {
        matches {
          title
          date
          players {
            firstName
            lastName
          }
        }
      }
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => {
        dispatch(fetchMatchesSuccess(res.data.data.matches));
      })
      .catch((error) => dispatch(fetchMatchesFail(error)));
  };
};
