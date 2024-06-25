const { User } = require("../models");

module.exports = class UserController {
  static async register(req, res) {
    //done
    try {
      const user = await User.create(req.body);
      res
        .status(200)
        .json({ id: user.id, username: user.username, email: user.email });
    } catch (err) {
      //   console.log(err.name);
      if (
        err.name == "SequelizeValidationError" ||
        err.name == "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        res.status(400).json("Email is required");
        return;
      }
      if (!password) {
        res.status(400).json("Password is required");
        return;
      }

      const user = user.findOne({ where: { email: email } });

      if (!user) {
        res.status(404).json({ message: " email or password not found" });
      }
      res.status(200).json({ message: "Login Success" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
