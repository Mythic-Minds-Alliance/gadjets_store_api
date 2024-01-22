/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products_cells',
      [
        {
          productId: 1,
          cellId: 1,
        },
        {
          productId: 1,
          cellId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_cells', null, {});
  },
};
