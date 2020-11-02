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
      Traitement.hasMany(models.RappelTraitement);

      Traitement.belongsTo(models.Animal, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Traitement.init({
    idANIMAL: DataTypes.INTEGER,
    libelle: DataTypes.STRING,
    rappel: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Traitement',
  });
  return Traitement;
};