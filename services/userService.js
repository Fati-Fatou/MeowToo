const models = require('../models');

const register = async (user) => {
  const userRecord = await models.User.create(user);
  return { user: userRecord };
};

module.exports = {
  register,
};
