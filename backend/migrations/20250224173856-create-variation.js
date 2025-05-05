'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('variations', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      classname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      textData: {
        type: DataTypes.STRING
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      priceV: {
        type: DataTypes.INTEGER
      },
      colorData1: {
        type: DataTypes.STRING
      },
      productsId: {
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
    await queryInterface.dropTable('variations');
  }
};