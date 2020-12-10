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
      Professionnel.hasMany(models.RendezVous, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });
      
      Professionnel.belongsTo(models.CategorieProfessionnelle, {
        foreignKey: 'id',
        as: 'categoriePro',
        constraints: false
      });

      Professionnel.belongsTo(models.Utilisateur, {
        foreignKey: 'id',
        as: 'utilisateur_id',
        constraints: false
      });

    }
  };
  Professionnel.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    adresse: DataTypes.STRING,
    codePostal: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categorieProId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Professionnel',
  });
  return Professionnel;
};