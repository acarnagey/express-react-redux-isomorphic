import { SubmissionError } from "redux-form";
// import * as actionTypes from "./actionTypes";
import actions from "../shared/pagination/actions";
import api from "../api";

export const { resultsUpdated, setPage } = actions("customers");

export function create(data) {
  return () =>
    api.customers
      .create(data)
      .then(() => "SUCCESS")
      .catch((err) => {
        if (err.response.status === 422) {
          throw new SubmissionError(err.response.data.errors);
        }
        throw err;
      });
}

// export function resultsUpdated({ results, totalCount }) {
//   return {
//     type: actionTypes.RESULTS_UPDATED,
//     results,
//     totalCount,
//   };
// }

export function list(page = 1, pageSize = 15) {
  return (dispatch) =>
    api.customers.list(page, pageSize).then((resp) => {
      dispatch(resultsUpdated(resp.data));
    });
}

// export function previous() {
//   return { type: actionTypes.PREV };
// }

// export function next() {
//   return { type: actionTypes.NEXT };
// }
