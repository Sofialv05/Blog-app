const { compare } = require("../helpers/bycript");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");

module.exports = class UserController {
  static async register(req, res, next) {
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
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      //login dengan email dan pw
      if (!email) {
        throw { name: "Required", message: "Email is required" };
      }
      if (!password) {
        throw { name: "Required", message: "Password is required" };
      }

      //nyari email yg sama di database
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Validate", message: "Email has not been registered" };
      }

      //kalo email ketemu, compare password dgn helper bcrypt
      const isValidPassword = compare(password, user.password);
      // console.log(isValidPassword);

      if (!isValidPassword) {
        throw { name: "Validate", message: "Invalid password" };
      }

      //apabila email dan password dah bener, bikin token yg isi payloadnya id user

      const token = signToken({ id: user.id });

      //kasih access token nya ke user
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
};
