const { compare } = require("../helpers/bycript");
const { User } = require("../models");
const { signToken, verifyToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res) {
    const { username, email, password, phoneNumber, address } = req.body;
    //done
    try {
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res
        .status(201)
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
      //login dengan email dan pw
      if (!email) {
        res.status(400).json("Email is required");
        return;
      }
      if (!password) {
        res.status(400).json("Password is required");
        return;
      }

      //nyari email yg sama di database
      const user = await user.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({ message: "Email has not been registered" });
        return;
      }

      //kalo email ketemu, compare password dgn helper bcrypt
      const isValidPassword = compare(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ message: "invalid password" });
        return;
      }

      //apabila email dan password dah bener, bikin token yg isi payloadnya id user

      const token = signToken({ id: user.id });

      //kasih access token nya ke user
      res.status(200).json({ access_token: token });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
