const bcrypt = require("bcrypt");

function createHashPass(pass) {
  return bcrypt.hashSync(pass, 8);
}

function comparePass(inputPass, passDb) {
  return bcrypt.compareSync(inputPass, passDb);
}

module.exports = { createHashPass, comparePass };
