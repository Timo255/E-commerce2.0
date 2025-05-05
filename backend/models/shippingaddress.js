'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({shipping}) {
      // define association here
      this.belongsTo(shipping, {foreignKey: "shippingId"});
    }
  }
  shippingAddress.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    line1: {
      type: DataTypes.STRING
    },
    line2: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    shippingId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'shippingAddress',
  });
  return shippingAddress;
};