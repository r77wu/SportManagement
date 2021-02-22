import * as actionTypes from "./types";
import axios from "axios";

const fetchPlayerStart = () => {
  return {
    type: actionTypes.FETCH_PLAYERS_START,
  };
};

const fetchPlayersSuccess = (data) => {
  return {
    type: actionTypes.FETCH_PLAYERS_SUCCESS,
    data,
  };
};

const fetchPlayersFail = (error) => {
  return {
    type: actionTypes.FETCH_PLAYERS_FAIL,
    error,
  };
};

export const fetchPlayers = () => {
  return (dispatch) => {
    dispatch(fetchPlayerStart());
    const requestBody = {
      query: `query {
        users {
          firstName
          lastName
          age
          gender
          points
          wins
          loses
        }
      }
      `,
    };
    axios
      .post("/graphql", requestBody)
      .then((res) => {
        dispatch(fetchPlayersSuccess(res.data.data.users));
      })
      .catch((error) => dispatch(fetchPlayersFail(error)));
  };
};
