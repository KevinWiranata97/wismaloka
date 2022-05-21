"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specification.belongsTo(models.House, { foreignKey: "houseId" });
    }
  }
  Specification.init(
    {
      houseId: DataTypes.INTEGER,
      luasTanah: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Luas Tanah is required",
          },
        },
      },
      luasBangunan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Luas Bangunan is required",
          },
        },
      },
      certificate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Certificate is required",
          },
          notNull: {
            args: true,
            msg: "Certificate is required",
          },
        },
      },
      dayaListrik: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Daya Listrik is required",
          },
        },
      },
      totalBedroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Total Bedroom is required",
          },
        },
      },
      totalBathroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Total Bathroom is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Specification",
    }
  );
  return Specification;
};
