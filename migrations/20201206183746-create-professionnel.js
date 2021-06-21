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
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.INTEGER
      },
      adresse: {
        type: Sequelize.STRING
      },
      codePostal: {
        type: Sequelize.INTEGER
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        allowNull: false
      },
      categorieProId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'ProfessionalCategories',
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