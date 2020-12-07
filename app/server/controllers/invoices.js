import * as service from "../services/invoices";

export default function invoicesController(api) {
  api.get("/invoices", (req, res, _) => {
    return service
      .list(req.query, req.currentUser)
      .then((page) => res.json(page));
  });
}
