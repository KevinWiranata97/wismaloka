"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      houseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Houses",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      luasTanah: {
        type: Sequelize.INTEGER,
      },
      luasBangunan: {
        type: Sequelize.INTEGER,
      },
      certificate: {
        type: Sequelize.STRING,
      },
      dayaListrik: {
        type: Sequelize.INTEGER,
      },
      totalBedroom: {
        type: Sequelize.INTEGER,
      },
      totalBathroom: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Specifications");
  },
};
