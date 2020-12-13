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

      Animal.hasMany(models.Poids, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });
        
      Animal.hasMany(models.RendezVous, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });

      Animal.hasMany(models.Vermifuge, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });

      Animal.hasMany(models.Vaccin, {
        foreignKey: 'id',
        onDelete: 'SET NULL',
        hooks: true
      });

      Animal.hasMany(models.Medicament);

      Animal.belongsTo(models.Utilisateur, {
        foreignKey: 'id',
        as: 'utilisateur_id',
        constraints: false
      });

    }
  };
  Animal.init({
    nom: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    userId: DataTypes.INTEGER,
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