import { SubmissionError } from "redux-form";
import actions from "../shared/pagination/actions";
import api from "../api";

export const { resultsUpdated } = actions("invoices");

export function create(data) {
  return async () => {
    try {
      await api.invoices.create(data);
      return "SUCCESS";
    } catch (err) {
      if (err.response.status === 422) {
        throw new SubmissionError(err.response.data.errors);
      }
      throw err;
    }
  }
}

export const list = (page = 1, pageSize = 15) => {
  return async (dispatch) => {
    const resp = await api.invoices.list(page, pageSize);
    dispatch(resultsUpdated(resp.data));
  }
}
