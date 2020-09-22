const Yup = require('yup');

module.exports = {
  async byId(request, response, next) {
    const schema = Yup.object().shape({
      user_id: Yup.number()
        .min(1, 'O ID não pode ser 0')
        .typeError('O ID deve ser numérico')
        .required('O ID é obrigatório')
    });

    try {
      await schema.validate({ user_id: request.params.user_id });

      return next();
    } catch (error) {
      return response.status(400).send({ message: error.errors });
    }
  },

  async create(request, response, next) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Nome muito curto')
        .max(250, 'Nome muito grande')
        .required('Nome obrigatório'),
      password: Yup.string()
        .min(5, 'Senha muito curta')
        .max(60, 'Senha muito longa')
        .required('Senha obrigatória'),
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
  }
};
