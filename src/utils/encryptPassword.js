const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return passwordHash;
};

const decryptPassword = async (password, passwordHash) => {
  const passwordDecrypted = await bcrypt.compare(password, passwordHash);
  return passwordDecrypted;
};

module.exports = {
  encryptPassword,
  decryptPassword
};
