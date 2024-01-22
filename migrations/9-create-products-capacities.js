/* eslint-disable */
'use strict';

const TABLE_NAME = 'products_capacities';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      capacityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'capacities',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products_capacities');
  },
};
