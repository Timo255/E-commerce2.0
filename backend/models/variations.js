'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class variation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({products}) {
      // define association here
      // this.belongsTo(products, {foreignKey: 'productsId', as: 'product'});
      // as: 'product', foreignKey: 'productId', 
      this.belongsToMany(products, {through: "productVariation" });
    }
    
    toJSON(){
      return {...this.get(), id: undefined }
    }
  }
  variation.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    textData: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceV:{
      type: DataTypes.INTEGER
    },
    colorData1: {
      type: DataTypes.STRING,
    },
    productsId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'variation',
  });
  return variation;
};