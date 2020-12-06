'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RendezVous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RendezVous.belongsTo(models.Animal, {
        foreignKey: 'id',
        as: 'rendezVous',
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      });
  
      RendezVous.belongsTo(models.Professionnel, {
        foreignKey: 'idProfessionnelRDV',
        as: 'rendezVousProfessionnel',
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      });
    }
  };
  RendezVous.init({
    dateRendezVous: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'RendezVous',
  });
  return RendezVous;
};