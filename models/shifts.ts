'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize: any, DataTypes: { DATE: any; }) => {
  class Shifts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models:any) {
      this.belongsTo(models.users,{foreignKey:'userId'});
      this.hasMany(models.sells,{foreignKey:'sellId'});
    }
  }
  Shifts.init({
    startedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    finishedAt: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    tableName: 'shifts',
    modelName: 'Shifts',
  });
  return Shifts;
};