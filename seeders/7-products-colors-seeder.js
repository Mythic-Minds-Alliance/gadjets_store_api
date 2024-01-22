/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products_colors',
      [
        {
          productId: 1,
          colorId: 1,
        },
        {
          productId: 1,
          colorId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_colors', null, {});
  },
};
