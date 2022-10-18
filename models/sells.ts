const {
  Model
} = require('sequelize');
export default (sequelize: any, DataTypes: { INTEGER: any; }) => {
  class sells extends Model {
    static associate(models: any) {
      this.hasMany(models.Items);
      this.belongsTo(models.Shifts, {foreignKey:'sellId'});
    }
  }
  sells.init({
    shiftId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sells',
  });
  return sells;
};