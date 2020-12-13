'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicament.belongsTo(models.Animal);

      Medicament.hasMany(models.Event, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });

      Medicament.hasMany(models.TypeRappel, {
        foreignKey: 'id',
        onDelete: 'SE NULL',
        hooks: true
      });
      
    }
  };
  Medicament.init({
    libelle: DataTypes.STRING,
    dateDebut: DataTypes.DATE,
    dateFin: DataTypes.DATE,
    rappel: DataTypes.BOOLEAN,
    typeRappelId: DataTypes.INTEGER,
    animalId: DataTypes.INTEGER,
    statut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Medicament',
  });
  return Medicament;
};