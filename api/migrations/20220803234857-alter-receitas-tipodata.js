'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('receitas', 'data', {
      type: Sequelize.DATEONLY,
      allowNull: false
    },)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('receitas', 'data', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
