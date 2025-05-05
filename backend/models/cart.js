"use strict";
const { Model } = require("sequelize");
const products = require("./products");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, products }) {
      // define association here
      this.belongsTo(user);
      this.belongsToMany(products, { through: "cartItem" });
      // products.belongsToMany(cart, { through: "cartItem" });
    }

    toJSON = () => {
      return {
        ...this.get(),
        id: undefined,
      };
    };
  }
  cart.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
