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
      Animal.hasMany(models.Traitement, {
        foreignKey: 'id'
      });

      Animal.hasMany(models.Poids, {
        foreignKey: 'id'
      });
        
      Animal.hasMany(models.RendezVous);

      Animal.belongsTo(models.Utilisateur, {
        foreignKey: 'id',
        as: 'utilisateur',
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
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