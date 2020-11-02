'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RendezVous', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateRendezVous: {
        allowNull: false,
        type: Sequelize.DATE
      },
      idANIMAL: {
        allowNull: false,
        type: Sequelize.INTEGER,       
        references: {
          model: 'Animals',
          key: 'id'
        }
      },
      idPROFESSIONNEL: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Professionnels',
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
    await queryInterface.dropTable('RendezVous');
  }
};