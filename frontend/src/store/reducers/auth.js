import * as actionTypes from "../actions/types";

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    ...action.data,
    loading: false,
  };
};
const loginFail = (state, action) => {
  return {
    ...state,
    ...action.data,
    loading: false,
  };
};

const logoutSuccess = (state, action) => {
  return {
    ...state,
    ...action.data,
    loading: false,
  };
};

const updateUserSuccess = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      ...action.data,
    },
  };
};

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return loginFail(state, action);
    case actionTypes.LOGOUT:
      return logoutSuccess(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    default:
      return { ...state };
  }
};

export default reducer;
