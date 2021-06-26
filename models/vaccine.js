'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vaccine.belongsTo(models.Pet);
      
    }
  };
  Vaccine.init({
    vaccineDate: DataTypes.DATE,
    nextVaccineDate: DataTypes.DATE,
    petID: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Vaccine',
  });
  return Vaccine;
};