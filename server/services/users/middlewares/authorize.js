const { User } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findByPk(id);

    if (req.user.role === "Admin") {
      next();
    } else {
      if (req.user.id === getUser.id) {
        next();
      } else {
        throw { name: "Forbidden", statusCode: 403 };
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
