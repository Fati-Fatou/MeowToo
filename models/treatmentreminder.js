/* eslint-disable linebreak-style */
const {
  Model,
// eslint-disable-next-line import/newline-after-import
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TreatmentReminder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TreatmentReminder.belongsTo(models.Treatment);
    }
  };
  TreatmentReminder.init({
    treatmentID: DataTypes.INTEGER,
    petID: DataTypes.INTEGER,
    remindeDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'TreatmentReminder',
  });
  return TreatmentReminder;
};
