'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Professional.belongsTo(models.RendezVous);
      
      Professional.belongsTo(models.ProfessionalCategory);

      Professional.belongsTo(models.Utilisateur);

    }
  };
  Professional.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    adresse: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    professionalCategoryID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Professional',
  });
  return Professional;
};