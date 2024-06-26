const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "Required":
      res.status(400).json({ message: err.message });
      break;
    case "Validate":
      res.status(401).json({ message: err.message });
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Unauthenticated" });
      break;

    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
