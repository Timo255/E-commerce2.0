'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({orderDetail}) {
      // define association here
      this.belongsTo(orderDetail, {foreignKey: "orderDetailId"});
    }
  }
  orderItem.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 
    },
    productName: {
      type: DataTypes.STRING
    },
    productId: {
      type: DataTypes.INTEGER
    },
    variationName: {
      type: DataTypes.STRING
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    orderDetailId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'orderItem',
  });
  return orderItem;
};