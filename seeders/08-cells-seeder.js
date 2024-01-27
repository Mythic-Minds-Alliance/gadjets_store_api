/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'cells',
      [
        {
          type: 'GPRS',
        },
        {
          type: 'WCDMA',
        },
        {
          type: 'HSPA',
        },
        {
          type: '5G',
        },
        {
          type: 'CDMA',
        },
        {
          type: 'EDGE',
        },
        {
          type: 'UMTS',
        },
        {
          type: 'LTE',
        },
        {
          type: 'GSM',
        },
        {
          type: 'EVDO',
        },
        {
          type: 'Wi-Fi',
        },
        {
          type: 'Bluetooth',
        },
        {
          type: 'Not applicable',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cells', null, {});
  },
};
