const Yup = require('yup');

module.exports = {
  async create(request, response, next) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .min(4, 'O e-mail precisa ter mais de 4 caracteres')
        .max(120, 'E-mail não pode ser maior que 160 caracteres')
        .email('E-mail inválido')
        .required('O e-mail é obrigatório')
    });

    try {
      await schema.validate(request.body);

      return next();
    } catch (error) {
      return response.status(400).send({ message: error.errors });
    }
  },

  async update(request, response, next) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .min(4, 'O e-mail precisa ter mais de 4 caracteres')
        .max(120, 'E-mail não pode ser maior que 160 caracteres')
        .email('E-mail inválido')
        .required('O e-mail é obrigatório'),
      password: Yup.string()
        .min(5, 'Senha muito curta')
        .max(60, 'Senha muito longa')
        .required('Senha obrigatória'),
      token: Yup.string().required('Token obrigatório')
    });

    try {
      await schema.validate(request.body);

      return next();
    } catch (error) {
      return response.status(400).send({ message: error.errors });
    }
  }
};
