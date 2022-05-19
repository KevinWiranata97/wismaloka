"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserHouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHouse.belongsTo(models.User);
    }
  }
  UserHouse.init(
    {
      UserId: DataTypes.INTEGER,
      HouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserHouse",
    }
  );
  return UserHouse;
};
