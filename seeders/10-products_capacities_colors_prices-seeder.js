/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products_capacities_colors_prices',
      [
        {
          productId: 1,
          capacityId: 2,
          colorId: 4,
          price: 699,
          priceDiscount: 600

        },
        {
          productId: 1,
          capacityId: 2,
          colorId: 5,
          price: 699,
          priceDiscount: 600

        },
        {
          productId: 1,
          capacityId: 2,
          colorId: 6,
          price: 699,
          priceDiscount: 600

        },
        {
          productId: 1,
          capacityId: 2,
          colorId: 7,
          price: 699,
          priceDiscount: 600

        },
        {
          productId: 1,
          capacityId: 2,
          colorId: 8,
          price: 699,
          priceDiscount: 600
        },
        {
          productId: 1,
          capacityId: 2,
          colorId: 9,
          price: 699,
          priceDiscount: 600
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 4,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 5,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 6,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 7,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 8,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 3,
          colorId: 9,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 4,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 5,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 6,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 7,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 8,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 1,
          capacityId: 4,
          colorId: 9,
          price: 899,
          priceDiscount: 800
        },
        {
          productId: 2,
          capacityId: 3,
          colorId: 1,
          price: 799,
          priceDiscount: 700
        },
        {
          productId: 2,
          capacityId: 4,
          colorId: 1,
          price: 829,
          priceDiscount: 799
        },
        {
          productId: 2,
          capacityId: 5,
          colorId: 1,
          price: 869,
          priceDiscount: 819
        },
        {
          productId: 2,
          capacityId: 6,
          colorId: 1,
          price: 899,
          priceDiscount: 879
        },
        {
          productId: 2,
          capacityId: 7,
          colorId: 1,
          price: 999,
          priceDiscount: 939
        },
        {
          productId: 2,
          capacityId: 3,
          colorId: 2,
          price: 790,
          priceDiscount: 710
        },
        {
          productId: 2,
          capacityId: 4,
          colorId: 2,
          price: 820,
          priceDiscount: 790
        },
        {
          productId: 2,
          capacityId: 5,
          colorId: 2,
          price: 865,
          priceDiscount: 810
        },
        {
          productId: 2,
          capacityId: 6,
          colorId: 2,
          price: 890,
          priceDiscount: 860
        },
        {
          productId: 2,
          capacityId: 7,
          colorId: 2,
          price: 959,
          priceDiscount: 919
        },
        {
          productId: 3,
          capacityId: 8,
          colorId: 1,
          price: 199,
          priceDiscount: 169
        },
        {
          productId: 3,
          capacityId: 9,
          colorId: 1,
          price: 250,
          priceDiscount: 219
        },
        {
          productId: 3,
          capacityId: 8,
          colorId: 2,
          price: 199,
          priceDiscount: 169
        },
        {
          productId: 3,
          capacityId: 9,
          colorId: 2,
          price: 250,
          priceDiscount: 219
        },
        {
          productId: 3,
          capacityId: 8,
          colorId: 3,
          price: 219,
          priceDiscount: 189
        },
        {
          productId: 3,
          capacityId: 9,
          colorId: 3,
          price: 259,
          priceDiscount: 219
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_capacities_colors_prices', null, {});
  },
};
