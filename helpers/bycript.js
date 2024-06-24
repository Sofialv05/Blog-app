const bcrypt = require("bcryptjs");

const encrypt = async (value) => {
  const hashedValue = await bcrypt.hash(value, bcrypt.genSaltSync(10));
  return hashedValue;
};

const compare = async (value, hashedPassword) => {
  const match = await bcrypt.compare(value, hashedPassword);
  return match;
};

module.exports = { encrypt, compare };
