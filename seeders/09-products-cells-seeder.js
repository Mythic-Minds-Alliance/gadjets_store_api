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
        {
          productId: 1,
          cellId: 3,
        },
        {
          productId: 1,
          cellId: 4,
        },
        {
          productId: 1,
          cellId: 5,
        },
        {
          productId: 1,
          cellId: 6,
        },
        {
          productId: 1,
          cellId: 7,
        },
        {
          productId: 1,
          cellId: 8,
        },
        {
          productId: 2,
          cellId: 13,
        },
        {
          productId: 3,
          cellId: 8,
        },
        {
          productId: 3,
          cellId: 11,
        },
        {
          productId: 3,
          cellId: 12,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_cells', null, {});
  },
};
