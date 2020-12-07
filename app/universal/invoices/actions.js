import { SubmissionError } from "redux-form";
import actions from "../shared/pagination/actions";
import api from "../api";

export const { resultsUpdated } = actions("invoices");

export function create(data) {
  return () =>
    api.invoices
      .create(data)
      .then(() => "SUCCESS")
      .catch((err) => {
        if (err.response.status === 422) {
          throw new SubmissionError(err.response.data.errors);
        }
        throw err;
      });
}

export function list(page = 1, pageSize = 15) {
  return (dispatch) =>
    api.invoices.list(page, pageSize).then((resp) => {
      dispatch(resultsUpdated(resp.data));
    });
}
