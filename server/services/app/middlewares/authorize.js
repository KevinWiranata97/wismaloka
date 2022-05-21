const { House } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getHouse = await House.findByPk(id);

      if (req.user.role === "Admin") {
        next();
      } else {
        if (req.user.id == getHouse.userId) {
          next();
        } else {
          throw { name: "Forbidden"};
        }
      
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authorization;
