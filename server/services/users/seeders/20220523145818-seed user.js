"use strict";

const { createHashPass } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../datas/user.json");

    data.forEach((element) => {
      element.password = createHashPass(element.password);
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
