import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import playersReducer from "./reducers/players";
import matchesReducer from "./reducers/match";

const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  matches: matchesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
