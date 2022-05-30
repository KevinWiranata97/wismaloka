"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../datas/images.json");

    data.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Images", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
