'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../datas/spesification.json')
   
    data.forEach(element => {
     element.createdAt = new Date()
     element.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('Specifications', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specifications', null, {});
  }
};
