const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: process.env.SYSTEM_MAIL_SERVICE,
  auth: {
    user: process.env.SYSTEM_MAIL_ADDRESS,
    pass: process.env.SYSTEM_MAIL_PASSWORD
  }
});

module.exports = {
  async create(request, response) {
    const { userEmail } = request.body;

    if (!userEmail) {
      return response
        .status(400)
        .send({ message: 'Parâmetros incompletos/inválidos' });
    }

    try {
      const user = await User.findOne({ where: { email: userEmail } });

      if (!user)
        return response.status(400).send({ error: 'Usuário não encontrado' });

      const token = crypto.randomBytes(20).toString('hex');

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);

      user.password_reset_token = token;
      user.password_reset_token_expires_at = expirationDate;

      await user.save();

      const mailOptions = {
        from: process.env.SYSTEM_MAIL_ADDRESS,
        to: userEmail,
        subject: 'Recupere sua senha!!',
        text: `Olá ${user.name}, como vão os negócios?\n\nVimos que você esqueceu sua senha!\n\nNão tem problema, utilize esse token para recupera-la!: \n${token}\n\nVemos você em breve!!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return response.status(400).send({
            message: 'Erro ao recuperar a senha, tente novamente mais tarde'
          });
        }
        return response.status(200).send();
      });

      return true;
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Houve um erro ao tentar recuperar sua senha' });
    }
  },

  async update(request, response) {
    const { email, password, token } = request.body;

    try {
      const user = await User.scope('withPasswordResetInfo').findOne({
        where: { email }
      });

      if (!user)
        return response.status(400).send({ message: 'Usuário não encontrado' });

      if (token !== user.password_reset_token)
        return response.status(400).send({ message: 'Token inválido' });

      const now = new Date();

      if (now > user.password_reset_token_expires_at)
        return response.status(400).send({ message: 'Token expirado' });

      const hash = crypto.createHash('sha512');

      user.password = hash.update(password).digest('hex');

      await user.save();

      return response.status(200).send();
    } catch (error) {
      return response.status(400).send({
        message: 'Erro ao recuperar senha, tente novamente mais tarde'
      });
    }
  }
};
