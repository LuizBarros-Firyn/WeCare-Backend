const crypto = require('crypto');
const User = require('../models/User');

module.exports = {
  async index(request, response) {
    const users = await User.findAll();

    return response.json(users);
  },

  async show(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id);

    if (!user)
      return response.status(400).send({ message: 'Usuário não encontrado' });

    return response.json(user);
  },

  async store(request, response) {
    const { name, email, password } = request.body;

    const isUserRegistered = await User.findOne({
      where: { email }
    });

    if (isUserRegistered) {
      return response.status(400).send({ message: 'Usuário já cadastrado' });
    }

    const hash = crypto.createHash('sha512');

    const user = await User.create({
      name,
      email,
      password: hash.update(password).digest('hex')
    });

    user.password = undefined;

    return response.json(user);
  },

  async destroy(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id);

    if (!user)
      return response.status(400).send({ message: 'Usuário não encontrado' });

    await user.destroy();

    return response.status(200).send();
  }
};
