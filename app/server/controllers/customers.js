import * as service from "../services/customers";

import Customer from "../models/Customer";

export default function customersController(api) {
  api.get("/customers", (req, res, _) => {
    return service
      .list(req.query, req.currentUser)
      .then((page) => res.json(page));
  });
  api.get("/customers/:id", (req, res, _) => {
    return service.findById(req.params.id).then((cust) => res.json(cust));
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
  api.put("/customers", (req, res, next) => {
    const customer = {
      ...req.body.customer,
      user_id: req.currentUser.id,
    };
    // return res.json({customer});
    return Customer.forge(customer)
      .save()
      .then((customer) => res.json({ customer }))
      .catch(next);
  });
  api.delete("/customers/:id", (req, res, _) => {
    return service.deleteById(req.params.id).then((cust) => res.json(cust));
  });
}
