import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";

import api from "./api";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// function* helloSaga() {
//   console.log("Hello Sagas!");
// }

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

function* requestListCustomers() {
  yield takeEvery("pagination/GET_PAGE customers", listCustomers);
}

function* listCustomers(action) {
  const {page, pageSize} = action;
  const resp = yield call(api.customers.list, page, pageSize);
  // similar to dispatch but you don't have to pass dispatch
  yield put({
    type: "pagination/RESULTS_UPDATED customers",
    results: resp.data.results,
    totalCount: resp.data.totalCount,
  });
  // return async (dispatch) => {
  //   const resp = await api.customers.list(page, pageSize);
  //   dispatch(resultsUpdated(resp.data));
  // };
}

function* requestLogin() {
  yield takeLatest("LOGIN", login);
}

function* login(action) {
  const {username, password} = action;
  const resp = yield call(api.session.login, username, password);
  yield put({type: "sessionSET", user: {...resp.data.user, token: resp.data.token} })
  // .then((resp) => dispatch(setUser(resp.data.user)));
}

function* requestLogout() {
  yield takeLatest("LOGOUT", logout);
}

function* logout(_) {
  yield call(api.session.logout);
  yield put({type: "sessionCLEAR"});
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    // helloSaga(),
    requestLogin(),
    requestLogout(),
    watchIncrementAsync(),
    requestListCustomers(),
  ]);
}
