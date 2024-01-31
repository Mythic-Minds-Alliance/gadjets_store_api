/* eslint-disable */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('favourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      capacity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('favourites');
  },
};
