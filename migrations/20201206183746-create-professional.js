'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Professionals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      professionalCategoryID: {
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
    await queryInterface.dropTable('Professionals');
  }
};