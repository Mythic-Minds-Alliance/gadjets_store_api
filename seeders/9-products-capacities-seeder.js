/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products_capacities',
      [
        {
          productId: 1,
          capacityId: 1,
        },
        {
          productId: 1,
          capacityId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_capacities', null, {});
  },
};
