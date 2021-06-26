'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dewormer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dewormer.belongsTo(models.Pet);
      
    }
  };
  Dewormer.init({
    dewormerDate: DataTypes.DATE,
    nextDewormerDate: DataTypes.DATE,
    petID: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Dewormer',
  });
  return Dewormer;
};