import reduce from "../reduce";
import * as actionTypes from "./actionTypes";

const initialState = {
  user: null,
};

function setUser(state, action) {
  return {
    ...state,
    user: action.user,
  };
}

function clearUser(state) {
  return {
    ...state,
    user: null,
  };
}

export default reduce(initialState, {
  [actionTypes.SET]: setUser,
  [actionTypes.CLEAR]: clearUser,
});
