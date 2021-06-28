'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TreatmentReminders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      treatmentID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Treatments',
          key: 'id',
        },
        allowNull: false
      },
      petID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Pets',
          key: 'id',
        },
        allowNull: false
      },
      remindeDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TreatmentReminders');
  }
};