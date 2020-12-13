'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Medicaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        type: Sequelize.STRING
      },
      dateDebut: {
        type: Sequelize.DATE
      },
      dateFin: {
        type: Sequelize.DATE
      },
      rappel: {
        type: Sequelize.BOOLEAN
      },
      typeRappelId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'TypeRappels',
          key: 'id'
        },
        allowNull: false
      },
      animalId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Animals',
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Medicaments');
  }
};