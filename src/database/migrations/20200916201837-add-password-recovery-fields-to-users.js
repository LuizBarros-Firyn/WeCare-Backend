module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'password_reset_token', {
      type: Sequelize.STRING
    });

    await queryInterface.addColumn('users', 'password_reset_token_expires_at', {
      type: Sequelize.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'password_reset_token');

    await queryInterface.removeColumn(
      'users',
      'password_reset_token_expires_at'
    );
  }
};
