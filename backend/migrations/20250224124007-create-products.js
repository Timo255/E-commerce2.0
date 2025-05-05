'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      nameShop: {
        type: DataTypes.STRING,
        allowNull:false
      },
      nameProduct: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: false
      },
      imgProductCard: {
        type: DataTypes.STRING,
        allowNull: false
      },
      variationTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isOffer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      relatedProduct: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products');
  }
};