const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    // console.log(access_token);

    const [bearer, token] = access_token.split(" ");

    if (bearer !== "Bearer") throw { name: "Unauthenticated" };

    const payload = verifyToken(token);
    if (!payload) throw { name: "Unauthenticated" };

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = { id: user.id, role: user.role };

    next();
  } catch (err) {
    // console.log(err.name);
    next(err);
  }
};

module.exports = authentication;
