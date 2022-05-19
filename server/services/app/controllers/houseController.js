const { House, Specification, sequelize, Image } = require("../models/index");
class HouseController {
  static async getAllHouses(req, res, next) {
    try {
      const houses = await House.findAll({
        include: [Specification, Image],
      });
      res.status(200).json(houses);
    } catch (err) {
      next(err);
    }
  }
  static async getHouseById(req, res, next) {
    try {
      const house = await House.findOne({
        where: { id: req.params.id },
        include: [Specification, Image],
      });
      res.status(200).json(house);
    } catch (err) {
      next(err);
    }
  }
  static async createHouse(req, res, next) {
    const t = await sequelize.transaction();
    let { title, price, description, location, instalment, coordinate, Specifications, Images } =
      req.body;
    try {
      const house = await House.create(
        {
          title,
          price,
          description,
          location,
          instalment,
          coordinate,
        },
        { transaction: t }
      );
      Specifications.houseId = house.id;
      Images.map((el) => (el.houseId = house.id));
      await Specification.create(Specifications, { transaction: t });
      await Image.bulkCreate(Images, { transaction: t });
      await t.commit();
      res.status(201).json(house);
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }
  static async updateHouse(req, res, next) {
    const t = await sequelize.transaction();
    let { title, price, description, location, instalment, coordinate, Specifications, Images } =
      req.body;
    try {
      await House.update(
        {
          title,
          price,
          description,
          location,
          instalment,
          coordinate,
        },
        { where: { id: req.params.id }, transaction: t }
      );
      const house = await House.findByPk(req.params.id);
      if (!house) {
        throw {
          name: "Not Found",
          message: "House not found",
        };
      }
      Specifications.houseId = req.params.id;
      Images.map((el) => (el.houseId = house.id));
      await Specification.destroy({ where: { houseId: req.params.id }, transaction: t });
      await Image.destroy({ where: { houseId: req.params.id }, transaction: t });
      await Specification.create(Specifications, { transaction: t });
      await Image.bulkCreate(Images, { transaction: t });
      await t.commit();
      res.status(200).json(house);
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteHouse(req, res, next) {
    const { id } = req.params;
    try {
      const house = await House.findByPk(id);
      if (!house) {
        throw {
          name: "Not Found",
          message: "House not found",
        };
      }
      await house.destroy({ where: { id } });
      res.status(200).json({ message: "House deleted" });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = HouseController;
