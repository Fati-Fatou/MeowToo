'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appointmentDate: {
        type: Sequelize.DATE
      },
      animalID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Animals',
          key: 'id'
        },
        allowNull: false
      },
      professionalID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Professionnels',
          key: 'id'
        },
        allowNull: false
      },
      userID: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Appointment');
  }
};