import { combineEpics, ofType } from "redux-observable";
import { delay, map, mapTo, mergeMap } from "rxjs/operators";

import api from "./api";
import { from } from "rxjs";

const pingEpic = (action$) =>
  action$.pipe(
    ofType("PING"),
    // same thing but less boilerplate
    // filter((action) => action.type === "PING"),
    delay(1000),
    mapTo({ type: "PONG" }),
  );

const loginEpic = (action$) =>
  action$.pipe(
    ofType("LOGIN"),
    mergeMap((action) =>
      from(api.session.login(action.username, action.password)).pipe(
        map((resp) => ({
          type: "sessionSET",
          user: { ...resp.data.user, token: resp.data.token },
        })),
      ),
    ),
  );

const logoutEpic = (action$, _state$) =>
  action$.pipe(
    ofType("LOGOUT"),
    mergeMap((_action) =>
      from(api.session.logout()).pipe(
        map((_response) => ({ type: "sessionCLEAR" })),
        // catchError(() => getLogoutFailed()),
        // startWith(getLogoutInProgress())¸
      ),
    ),
  );

const listCustomersEpic = (action$) => {
  return action$.pipe(
    ofType("pagination/GET_PAGE customers"),
    mergeMap((action) =>
      from(api.customers.list(action.page, action.pageSize)).pipe(
        map((resp) => ({
          type: "pagination/RESULTS_UPDATED customers",
          results: resp.data.results,
          totalCount: resp.data.totalCount,
        })),
      ),
    ),
  );
};

export default combineEpics(pingEpic, loginEpic, logoutEpic, listCustomersEpic);
