"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      House.hasOne(models.Specification, { foreignKey: "houseId" });
      House.hasMany(models.Image, { foreignKey: "houseId" });
    }
  }
  House.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Title is required",
          },
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description is required",
          },
          notNull: {
            args: true,
            msg: "Description is required",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Location is required",
          },
          notNull: {
            args: true,
            msg: "Location is required",
          },
        },
      },
      instalment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Instalment is required",
          },
        },
      },
      coordinate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Coordinate is required",
          },
          notNull: {
            args: true,
            msg: "Coordinate is required",
          },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "House",
    }
  );
  return House;
};
