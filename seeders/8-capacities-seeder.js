'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('capacities', [
      {
        capacity: '32GB',
      },
      {
        capacity: '64GB',
      },
      {
        capacity: '128GB',
      },
      {
        capacity: '256GB',
      },
      {
        capacity: '512GB',
      },
      {
        capacity: '1TB',
      },
      {
        capacity: '2TB',
      },
      {
        capacity: '38mm',
      },
      {
        capacity: '42mm',
      },
      {
        capacity: '40mm',
      },
      {
        capacity: '44mm',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('capacities', null, {});
  },
};
