const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jwtKey = require('../config/jwtKey');
const User = require('../models/User');

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;

    const hash = crypto.createHash('sha512');

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        password: hash.update(password).digest('hex')
      }
    });

    if (!user) {
      return response.status(400).send({ message: 'Email ou Senha inválida' });
    }

    const authorizationKey = jwt.sign({ id: user.id }, jwtKey.secret, {
      expiresIn: process.env.JWT_KEY_EXPIRATION_TIME
    });

    const userSession = {
      user: {
        id: user.id,
        email: user.email
      }
    };

    return response.json({ userSession, authorizationKey });
  }
};
