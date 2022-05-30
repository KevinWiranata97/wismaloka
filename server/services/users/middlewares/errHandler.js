function errHandle(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      err = err.errors.map((el) => el.message);
      res.status(400).json({
        message: err[0],
      });
      break;
    case "Email is required":
      res.status(400).json({
        message: "Email is required",
      });
      break;
    case "Password is required":
      res.status(400).json({
        message: "Password is required",
      });
      break;
    case "401":
      res.status(401).json({
        message: "Invalid email/password",
      });
      break;
    case "Data not found":
      res.status(404).json({
        message: "User not found",
      });
      break;
    case "AuthFail":
      res.status(401).json({
        message: "You are not authorized",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        message: "Invalid token",
      });
      break;
    case "Forbidden":
      res.status(403).json({
        message: "Forbidden Access",
      });
      break;

    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
}

module.exports = errHandle;
