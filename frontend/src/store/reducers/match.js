import * as actionTypes from "../actions/types";

const fetchMatchesStart = (state, action) => {
  return [];
};

const fetchMatchesSuccess = (state, action) => {
  return [...state, ...action.data];
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MATCHES_START:
      return fetchMatchesStart(state, action);
    case actionTypes.FETCH_MATCHES_SUCCESS:
      return fetchMatchesSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
