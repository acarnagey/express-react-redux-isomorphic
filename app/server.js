import { apiRoutes, decode } from "./server/authentication";

import ValidationException from "./server/models/ValidationException";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import customersController from "./server/controllers/customers";
import express from "express";
import invoicesController from "./server/controllers/invoices";
import morgan from "morgan";
import render from "./serverRender";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));

app.use(decode);

app.use("/api", apiRoutes);

customersController(apiRoutes);
invoicesController(apiRoutes);

apiRoutes.use((err, _, res, next) => {
  if (err instanceof ValidationException) {
    res.status(422).json({ errors: err.errors });
  } else {
    next(err);
  }
});
app.use("/assets", express.static("assets"));

app.use(render);

app.listen(9999);
// import template from './template';

// import { kx } from "./server/connection";

// kx.on("query", (data) => console.log(data));

// function renderClient(req, res) {
//   res.send(template);
// }

// app.use(renderClient);
// const invoices = kx
//   .from("invoices")
//   .select("total", "email", "username")
//   .innerJoin("users", "users.id", "invoices.user_id")
//   .then((rows) => {
//     return rows;
//   });
// const users = kx
//   .from("users")
//   .select("username", "total", "email")
//   .innerJoin("invoices", "invoices.user_id", "users.id")
//   .then((rows) => {
//     return rows;
//   });

// const eagerUsers = User.fetchAll({
//   withRelated: ["invoices"]
// }).then((relation) => {
//   return relation;
// });
