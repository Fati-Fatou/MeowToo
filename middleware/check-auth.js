const jwtUtils = require('../utils/jwt.utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }
};
