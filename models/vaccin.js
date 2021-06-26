'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vaccin.belongsTo(models.Pet);
      
    }
  };
  Vaccin.init({
    dateVaccin: DataTypes.DATE,
    dateProchainVaccin: DataTypes.DATE,
    petID: DataTypes.INTEGER,
    statut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vaccin',
  });
  return Vaccin;
};