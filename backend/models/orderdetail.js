"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user,orderItem,shipping}) {
      // define association here
      this.belongsTo(user);
      this.hasMany(orderItem, {foreignKey: "orderDetailId"},{onDelete: 'CASCADE', hooks:true})
      this.hasOne(shipping, {foreignKey: "orderDetailId"},{onDelete: 'CASCADE', hooks:true})
    }
  }
  orderDetail.init(
    {
      uuid: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4 
      },
      subtotal: {
        type: DataTypes.INTEGER
      },
      total: {
        type: DataTypes.INTEGER
      },
      delivery_status: {
        type: DataTypes.STRING,
        defaultValue: "pending"
      },
      payment_status: {
        type: DataTypes.STRING
      },
      customerId: {
        type: DataTypes.STRING
      },
      userId: {
        type: DataTypes.INTEGER
      },
    },
    {
      sequelize,
      modelName: "orderDetail",
    }
  );
  return orderDetail;
};
