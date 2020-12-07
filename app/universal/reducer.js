import { combineReducers } from "redux";
import customers from "./customers/reducer";
import { reducer as form } from "redux-form";
import paginate from "./shared/pagination/reducer";
import rgb from "./rgbReducer";
import session from "./session/reducer";

export default combineReducers({
  rgb,
  session,
  form,
  customers: paginate("customers"),
  invoices: paginate("invoices"),
});
