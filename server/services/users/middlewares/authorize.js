const { User } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findByPk(id);

    if (!getUser) {
      throw { name: "Data not found" };
    } else {
      if (req.user.role === "Admin") {
        next();
      } else {
        if (req.user.id === getUser.id) {
          next();
        } else {
          throw { name: "Forbidden"};
        }
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authorization;
