'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vaccins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateVaccin: {
        type: Sequelize.DATE
      },
      dateProchainVaccin: {
        type: Sequelize.DATE
      },
      animalId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Animals',
          key: 'id'
        }
      },
      statut: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Vaccins');
  }
};