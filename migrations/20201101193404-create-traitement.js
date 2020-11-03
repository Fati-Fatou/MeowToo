'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Traitements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animalId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Animals',
          key: 'id',
          as: 'id_animal'
        }
      },
      libelle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rappel: {
        allowNull: true,
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
    await queryInterface.dropTable('Traitements');
  }
};