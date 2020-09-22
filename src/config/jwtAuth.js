const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtKey');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send({ error: 'Acesso não autorizado' });
  }

  const parts = authorization.split(' ');

  if (!parts.length === 2)
    return response.status(401).send({ error: 'Erro no token' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, jwtKey.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send({ error: 'Token invalido' });
    }

    request.userJwtId = decoded.id;

    return next();
  });

  return true;
};
