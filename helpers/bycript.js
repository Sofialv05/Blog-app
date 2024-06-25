const bcrypt = require("bcryptjs");

const encrypt = (value) => {
  const hashedValue = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
  return hashedValue;
};

const compare = (value, hashedPassword) => {
  const match = bcrypt.compareSync(value, hashedPassword);
  return match;
};

module.exports = { encrypt, compare };
