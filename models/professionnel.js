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
      Professionnel.hasMany(models.RendezVous);
      Professionnel.belongsTo(models.CategorieProfessionnelle, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Professionnel.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    idCATEGORIEPRO: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Professionnel',
  });
  return Professionnel;
};