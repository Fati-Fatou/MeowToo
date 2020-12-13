'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professionnel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Professionnel.belongsTo(models.RendezVous);
      
      Professionnel.belongsTo(models.CategorieProfessionnelle);

      Professionnel.belongsTo(models.Utilisateur);

    }
  };
  Professionnel.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    adresse: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    utilisateurId: DataTypes.INTEGER,
    categorieProId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Professionnel',
  });
  return Professionnel;
};