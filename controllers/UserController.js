const { compare } = require("../helpers/bycript");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "Required", message: "Email is required" };
      }
      if (!password) {
        throw { name: "Required", message: "Password is required" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Validate", message: "Email has not been registered" };
      }

      const isValidPassword = compare(password, user.password);

      if (!isValidPassword) {
        throw { name: "Validate", message: "Invalid password" };
      }

      const token = signToken({ id: user.id });

      res.status(200).json({ access_token: token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
};
