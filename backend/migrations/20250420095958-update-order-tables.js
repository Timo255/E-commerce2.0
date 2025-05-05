"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("orderDetails", "userId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn("orderItems", "orderDetailId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn("shippings", "orderDetailId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn("shippingAddresses", "shippingId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
