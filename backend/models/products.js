"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ variation, cart, products }) {
      this.belongsToMany(variation, { through: "productVariation" });
      this.belongsToMany(cart, { through: "cartItem" });
    }
  }
  products.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nameShop: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgLg439: {
        type: DataTypes.STRING,
      },
      imgMd309: {
        type: DataTypes.STRING,
      },
      imgMd360: {
        type: DataTypes.STRING,
      },
      isSlider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgProductCard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      variationTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isOffer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      relatedProduct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      newProduct: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
