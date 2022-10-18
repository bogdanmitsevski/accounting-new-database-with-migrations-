const {
  Model
} = require('sequelize');
export default (sequelize: any, DataTypes: { STRING: any; INTEGER: any; }) => {
  class Items extends Model {
    static associate(models:any) {
      this.belongsTo(models.sells, {foreignKey:'sellId'});
    }
  }
  Items.init({
    name: {type:DataTypes.STRING,unique: true},
    price: {type:DataTypes.INTEGER}
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Items'
  });
  return Items;
};