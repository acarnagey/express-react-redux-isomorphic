import Invoice from "../models/Invoice";

export function list({ page, pageSize }, user) {
  return Invoice.query((qb) => {
    qb.innerJoin("customers", "customers.id", "invoices.customer_id");
    qb.innerJoin("users", "users.id", "customers.user_id");
    qb.where("users.id", "=", user.id);
  })
    .orderBy("-created_at")
    .fetchPage({
      page,
      pageSize,
      withRelated: ["customer"],
    })
    .then((resp) => {
      return {
        totalCount: resp.pagination.rowCount,
        results: resp.models.map(m => m.toJSON()),
      };
    });
}
