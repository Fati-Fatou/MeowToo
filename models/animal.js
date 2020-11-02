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
      Animal.hasMany(Traitement, {
        foreignKey: 'id_animal',
      });

      Animal.hasMany(models.Poids);
      Animal.hasMany(models.RendezVous);
      Animal.belongsTo(models.Utilisateur, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Animal.init({
    nom: DataTypes.STRING,
    dateNaissance: DataTypes.DATE,
    idUTILISATEUR: DataTypes.INTEGER,
    espece: DataTypes.STRING,
    genre: DataTypes.STRING,
    race: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Animal',
  });
  return Animal;
};