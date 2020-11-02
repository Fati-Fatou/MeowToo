'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poids extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poids.belongsTo(Animal, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  };
  Poids.init({
    idANIMAL: DataTypes.INTEGER,
    poids: DataTypes.INTEGER,
    datePesee: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Poids',
  });
  return Poids;
};