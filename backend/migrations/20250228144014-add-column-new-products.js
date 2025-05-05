'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.addColumn('products', 'newProduct',{
      type: DataTypes.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.removeColumn('products', 'newProduct');
  }
};
