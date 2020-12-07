import * as actionTypes from "./actionTypes";

import api from "../api";

export function setUser(user) {
  return { type: actionTypes.SET, user };
}
export function clearUser() {
  return { type: actionTypes.CLEAR };
}
export function login(username, password) {
  return (dispatch) =>
    api.session
      .login(username, password)
      .then((resp) => dispatch(setUser(resp.data.user)));
}

export function logout() {
  return (dispatch) => api.session.logout().then(() => dispatch(clearUser()));
}
