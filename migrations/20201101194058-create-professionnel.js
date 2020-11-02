'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Professionnels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      telephone: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      adress: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idCATEGORIEPRO: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CategoriesProfessionnelles',
          key: 'id'
        }
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
    await queryInterface.dropTable('Professionnels');
  }
};