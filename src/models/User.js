const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        password_reset_token: DataTypes.STRING,
        password_reset_token_expires_at: DataTypes.DATE
      },
      {
        sequelize,
        defaultScope: {
          attributes: {
            exclude: [
              'password',
              'password_reset_token',
              'password_reset_token_expires_at',
              'createdAt',
              'updatedAt'
            ]
          }
        },
        scopes: {
          withPassword: {
            attributes: {}
          },
          withPasswordResetInfo: {
            attributes: { exclude: ['password'] }
          }
        }
      }
    );
  }
}

module.exports = User;
