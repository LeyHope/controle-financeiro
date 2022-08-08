'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('despesas', 'categoria', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 8

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('despesas', 'categoria')
  }
};
