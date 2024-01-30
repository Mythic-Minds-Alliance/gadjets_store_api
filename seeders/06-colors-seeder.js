/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'colors',
      [
        {
          name: 'space gray',
        },
        {
          name: 'silver',
        },
        {
          name: 'gold',
        },
        {
          name: 'black',
        },
        {
          name: 'green',
        },
        {
          name: 'yellow',
        },
        {
          name: 'white',
        },
        {
          name: 'red',
        },
        {
          name: 'purple',
        },
        {
          name: 'blue',
        },
        {
          name: 'starlight',
        },
        {
          name: 'pink',
        },
        {
          name: 'rose gold',
        },
        {
          name: 'midnight',
        },
        {
          name: 'sierrablue',
        },
        {
          name: 'midnightgreen',
        },
        {
          name: 'coral',
        },
        {
          name: 'spaceblack',
        },
        {
          name: 'graphite',
        },
        {
          name: 'sky blue',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {});
  },
};
