'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
     let data = require('../datas/house.json')
   
     data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
     });

     await queryInterface.bulkInsert('Houses', data, {})
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Houses', null, {});
  }
};
