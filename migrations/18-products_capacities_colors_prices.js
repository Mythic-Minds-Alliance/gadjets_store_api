/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products_capacities_colors_prices', {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      capacityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'capacities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'colors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      priceDiscount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products_capacities_colors_prices');
  },
};
