'use strict';

const TABLE_NAME = 'products_cells';

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
      cellId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'cells',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products_cells');
  },
};
