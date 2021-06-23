'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Animal.hasMany(models.Weight);
        
      Animal.hasMany(models.RendezVous);

      Animal.hasMany(models.Vermifuge);

      Animal.hasMany(models.Vaccin);

      Animal.hasMany(models.Treatment);

      Animal.belongsTo(models.Utilisateur);

    }
  };
  Animal.init({
    nom: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    utilisateurId: DataTypes.INTEGER,
    espece: DataTypes.STRING,
    genre: DataTypes.STRING,
    race: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};