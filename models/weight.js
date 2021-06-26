'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Weight.belongsTo(models.Pet);
    }

  };
  Weight.init({
    petID: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    weighingDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Weight',
  });
  return Weight;
};