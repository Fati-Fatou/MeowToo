'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vaccines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vaccineDate: {
        type: Sequelize.DATE,
      },
      nextVaccineDate: {
        type: Sequelize.DATE,
      },
      petID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Pets',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.BOOLEAN,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vaccines');
  },
};