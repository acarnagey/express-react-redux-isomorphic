import * as service from "../services/customers";

import Customer from "../models/Customer";

export default function customersController(api) {
  api.get("/customers", (req, res, next) => {
    return service
      .list(req.query, req.currentUser)
      .then((page) => res.json(page));
  });
  api.post("/customers", (req, res, next) => {
    const customer = {
      ...req.body.customer,
      user_id: req.currentUser.id,
    };
    return Customer.forge(customer)
      .save()
      .then((customer) => res.json({ customer }))
      .catch(next);
    // => {
    //   res.status(422).end();
    // });
  });
}
