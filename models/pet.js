'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Pet.hasMany(models.Weight);
      Pet.hasMany(models.Appointment);
      Pet.hasMany(models.Dewormer);
      Pet.hasMany(models.Vaccine);
      Pet.hasMany(models.Treatment);
      Pet.belongsTo(models.User);

    }
  };
  Pet.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    userID: DataTypes.INTEGER,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    race: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};