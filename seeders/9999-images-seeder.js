/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'images',
      [
        {
          productId: 1,
          path: 'img/phones/apple-iphone-11-pro-max/spacegray/00.webp',
        },
        {
          productId: 1,
          path: 'img/phones/apple-iphone-11-pro-max/spacegray/01.webp',
        },
        {
          productId: 1,
          path: 'img/phones/apple-iphone-11-pro-max/spacegray/02.webp',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
  },
};
