import * as actionTypes from "./actionTypes";

export function setUser(user) {
  return { type: actionTypes.SET, user };
}
export function clearUser() {
  return { type: actionTypes.CLEAR };
}
export function login(username, password) {
  return {
    type: "LOGIN",
    username,
    password,
  };
}

export function logout() {
  return {
    type: "LOGOUT"
  };
}
