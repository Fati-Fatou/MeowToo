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
      RendezVous.belongsTo(models.Animal);
  
      RendezVous.hasOne(models.Professional);
      
    }
  };
  RendezVous.init({
    dateRendezVous: DataTypes.DATE,
    animalId: DataTypes.INTEGER,
    professionnelId: DataTypes.INTEGER,
    utilisateurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RendezVous',
  });
  return RendezVous;
};