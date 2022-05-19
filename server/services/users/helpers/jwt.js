const jwt = require("jsonwebtoken");

sKey = "wismaloka!";

function createToken(payload) {
  return jwt.sign(payload, sKey);
}

function readToken(token) {
  return jwt.verify(token, sKey);
}

module.exports = { createToken, readToken };
