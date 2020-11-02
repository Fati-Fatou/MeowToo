'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategorieProfessionnelle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategorieProfessionnelle.hasMany(Professionnel);
    }
  };
  CategorieProfessionnelle.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategorieProfessionnelle',
  });
  return CategorieProfessionnelle;
};