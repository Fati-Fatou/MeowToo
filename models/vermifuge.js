'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vermifuge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vermifuge.belongsTo(models.Animal, {
        foreignKey: 'id',
        as: 'animal_id',
        constraints: false
      });
      
    }
  };
  Vermifuge.init({
    dateVermifuge: DataTypes.DATE,
    dateProchainVermifuge: DataTypes.DATE,
    animalId: DataTypes.INTEGER,
    statut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vermifuge',
  });
  return Vermifuge;
};