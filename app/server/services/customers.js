import Customer from "../models/Customer";

export function list({ page, pageSize }, user) {
  return Customer.where({ user_id: user.id })
    .orderBy("email")
    .fetchPage({ page, pageSize })
    .then((resp) => {
      // console.log(resp.models);
      return {
        totalCount: resp.pagination.rowCount,
        results: resp.models.map((m) => m.toJSON()),
      };
    });
}

export const findById = (id) => {
  return Customer.where({ id })
    .fetch()
    .then((resp) => {
      return resp;
    });
}

export const deleteById = (id) => {
  return Customer.where({ id })
  .fetch()
  .then((resp) => {
    return resp.destroy({require: true}).then((resp2) => {
      return resp2;
    });
  });
}