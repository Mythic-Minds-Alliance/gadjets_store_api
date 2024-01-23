/* eslint-disable */
'use strict';

const TABLE_NAME = 'products';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      namespaceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      priceRegular: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      resolution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      screen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      processor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ram: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      camera: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zoom: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  },
};
