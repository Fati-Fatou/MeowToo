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
      Poids.belongsTo(models.Animal, {
        foreignKey: 'id',
        as: 'animal',
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE'
      });
    }
  };
  Poids.init({
    animalId: DataTypes.INTEGER,
    poids: DataTypes.INTEGER,
    datePesee: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Poids',
  });
  return Poids;
};