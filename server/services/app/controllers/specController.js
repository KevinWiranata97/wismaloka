const { Specification } = require("../models/index");

class SpecController {
  static async getAllSpecs(req, res, next) {
    try {
      const specs = await Specification.findAll();
      if (specs.length === 0) {
        throw {
          name: "Not Found",
          message: "Specs not found",
        };
      }
      res.status(200).json(specs);
      
    } catch (err) {
      next(err);
    }
  }
}
module.exports = SpecController;
