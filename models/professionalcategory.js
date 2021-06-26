'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfessionalCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfessionalCategory.hasMany(models.Professional);
    }
    
  };
  ProfessionalCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfessionalCategory',
  });
  return ProfessionalCategory;
};