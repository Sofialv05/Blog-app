const { sign, verify } = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports = {
  signToken: (payload) => sign(payload, secret),
  verifyToken: (token) => verify(token, secret),
};
