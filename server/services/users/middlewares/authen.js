const { readToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = readToken(access_token);
    const getUser = await User.findByPk(payload.id);

    if (!getUser) {
      throw { name: "AuthFail", statusCode: 401 };
    } else {
      req.user = {
        id: getUser.id,
        email: getUser.email,
        role: getUser.role,
        isPremium: getUser.isPremium,
        profilePict: getUser.profilePict,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
