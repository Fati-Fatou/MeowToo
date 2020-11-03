'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Animals', {
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
      dateNaissance: {
        allowNull: true,
        type: Sequelize.DATE
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        }
      },
      espece: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'Chat',
          'Chien',
        ],
        defaultValue: 'Chat'
      },
      genre: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: [
          'Mâle',
          'Femelle',
        ],
        defaultValue: 'Femelle'
      },
      race: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Animals');
  }
};