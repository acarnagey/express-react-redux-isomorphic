import Customer from "./Customer";
import bookshelf from "../connection";

export default bookshelf.Model.extend({
  tableName: "invoices",
  customer: function () {
    return this.belongsTo(Customer);
  },
});
