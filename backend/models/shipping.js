"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({orderDetail,shippingAddress}) {
      // define association here
      this.belongsTo(orderDetail, {foreignKey: "orderDetailId"})
      this.hasOne(shippingAddress,{onDelete: 'CASCADE', hooks:true})
    }
  }
  shipping.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4 
      },
      email: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      tax_exempt: {
        type: DataTypes.STRING
      },
      orderDetailId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    },
    {
      sequelize,
      modelName: "shipping",
    }
  );
  return shipping;
};
