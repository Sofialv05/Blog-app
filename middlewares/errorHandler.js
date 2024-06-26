const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "Required":
      status = 400;
      message = err.message;
      break;
    case "Validate":
      status = 401;
      message = err.message;
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "Unauthorized";
      break;
    case "NotFound":
      status = 404;
      message = err.message;
      break;
  }
  res.status(status).json({ message: message });
};

module.exports = errorHandler;
