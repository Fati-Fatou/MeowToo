'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traitement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Traitement.belongsTo(Animal, {
        foreignKey: 'id_animal',
        onDelete: 'CASCADE'
      });

      Traitement.hasMany(models.RappelTraitement);
    }
  };
  Traitement.init({
    idANIMAL: DataTypes.INTEGER,
    libelle: DataTypes.STRING,
    rappel: DataTypes.BOOELAN
  }, {
    sequelize,
    modelName: 'Traitement',
  });
  return Traitement;
};