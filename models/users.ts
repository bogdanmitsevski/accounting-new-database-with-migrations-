const {
  Model
} = require('sequelize');
export default (sequelize: any, DataTypes: { STRING: any; }) => {
  class users extends Model {
    static associate(models:any) {
     this.hasMany(models.Shifts,{foreignKey:'userId'});
    }
  }
  users.init({
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'users',
  });
  return users;
};