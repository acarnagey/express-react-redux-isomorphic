import jwt from "jsonwebtoken";
import secret from "./secret";

export default function decode(req, res, next) {
  const token = req.get("auth-token") || req.cookies["auth-token"];
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        req.authFailed = true;
      } else {
        req.currentUser = decoded;
      }
    });
    next();
  } else {
    req.noTokenProvided = true;
    next();
  }
}
