import * as actionTypes from "../actions/types";

const fetchPlayerStart = (state, action) => {
  return [];
};

const fetchPlayerSuccess = (state, action) => {
  return [...state, ...action.data];
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYERS_START:
      return fetchPlayerStart(state, action);
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return fetchPlayerSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
