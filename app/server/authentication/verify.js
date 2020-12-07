export default function verify(req, res, next) {
  if (req.authFailed) {
    return res.status(403).json({ message: "failed to authenticate token" });
  }
  if (req.noTokenProvided) {
    return res.status(403).json({ message: "no token provided" });
  }
  next();
}
