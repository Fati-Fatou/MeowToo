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
        foreignKey: 'id'
      });
      Professionnel.belongsTo(models.CategorieProfessionnelle, {
        foreignKey: 'id',
        as: 'categoriePro',
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      });

    }
  };
  Professionnel.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    adress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Professionnel',
  });
  return Professionnel;
};