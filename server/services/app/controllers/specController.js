const { Specification } = require("../models/index");

class SpecController {
  static async getAllSpecs(req, res, next) {
    try {
      const specs = await Specification.findAll();
      res.status(200).json(specs);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = SpecController;
