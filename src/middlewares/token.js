const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  try {
    const decoded = jwt.verify(token, '%f7qbk)MET*t0z=LGV_vGQJ!$w/SX(NV(.xujTqp=6^hpQlz)$RUT*U9e$g;V');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido');
  }
}