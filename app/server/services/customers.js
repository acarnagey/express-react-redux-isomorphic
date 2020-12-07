import Customer from "../models/Customer";

export function list({ page, pageSize }, user) {
  return Customer.where({ user_id: user.id })
    .orderBy("email")
    .fetchPage({ page, pageSize })
    .then((resp) => {
      // console.log(resp.models);
      return {
        totalCount: resp.pagination.rowCount,
        results: resp.models.map(m => m.toJSON()),
      };
    });
}
