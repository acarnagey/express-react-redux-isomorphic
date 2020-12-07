import { checkCsrf, setCsrf } from "./csrf";

import User from "../models/User";
import bcrypt from "bcrypt";
// import decode from "./decode";
import express from "express";
import jwt from "jsonwebtoken";
import secret from "./secret";
import verify from "./verify";

function lookup(username = "") {
  return User.where({ username })
    .fetch()
    .then((user) => user && user.toJSON());
}

const api = express.Router();

api.post("/session", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await lookup(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(422).json({ code: "invalid_credentials" });
    } else {
      const { password, ...rest } = user;
      const token = jwt.sign(rest, secret, { expiresIn: 60 * 60 });
      setCsrf(req, res, () => {
        // http only so that the js can't read it prevent XSS attacks
        res
          .cookie("auth-token", token, { httpOnly: true })
          .json({ token, user: rest });
      });
    }
  } catch (err) {
    res.status(422).json({ code: "invalid_credentials" });
  }
});

// Not used, but used for testing
api.get("/session", (req, res) => {
  res.json({ user: req.currentUser });
});

api.delete("/session", (_, res) => {
  res.clearCookie("auth-token");
  return res.status(200).end();
});

// api.use(decode);
api.use(verify);
if(process.env.NODE_ENV === 'production') {
  api.use(checkCsrf);
}
api.use(setCsrf);

export default api;
