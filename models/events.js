'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Medicament, {
        foreignKey: 'id',
        as: 'medicament_id',
        constraints: false
      });
    }
  };
  events.init({
    medicamentId: DataTypes.INTEGER,
    dateHeureRappel: DataTypes.DATE,
    statut: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};