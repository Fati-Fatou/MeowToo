const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

const userService = require('../services/userService');

const EMAIL_REGEX = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// eslint-disable-next-line consistent-return
exports.user_register = async (req, res) => {
  const pFirstName = req.body.firstname;
  const pLastName = req.body.lastname;
  const pEmail = req.body.email;
  const pTelephone = req.body.telephone;
  const pPassword = req.body.password;

  if (pFirstName == null || pLastName == null || pPassword == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (!EMAIL_REGEX.test(pEmail)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  if (!PASSWORD_REGEX.test(pPassword)) {
    return res.status(400).json({ error: 'Mot de passe invalide' });
  }

  try {
    const userFound = await models.User.findOne({
      attributes: ['email'],
      where: { email: pEmail },
    });

    if (!userFound) {
      (async () => {
        bcrypt.hash(pPassword, 5, (err, bycryptedPassword) => {
          const newUser = userService.register({
            firstname: pFirstName,
            lastname: pLastName,
            email: pEmail,
            telephone: pTelephone,
            password: bycryptedPassword,
            isAdmin: 0,
          });
          return res.status(200).json(newUser);
        });
      })().catch((e) => { console.error(e); });
    } else {
      return res.status(409).json({ error: 'User already exist' });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// eslint-disable-next-line consistent-return
exports.user_login = async (req, res) => {
  const pEmail = req.body.email;
  const pPassword = req.body.password;

  if (pEmail == null || pPassword == null) {
    return res.status(400).json({ error: 'paramètres manquants' });
  }

  try {
    const userFound = await models.User.findOne({
      where: { email: pEmail },
    });

    if (userFound) {
      bcrypt.compare(pPassword, userFound.password, (errBycrypt, resBycrypt) => {
        if (resBycrypt) {
          return res.status(201).json({
            userId: userFound.id,
            token: jwtUtils.generateTokenForUser(userFound),
          });
        }
        return res.status(403).json({ error: 'password invalide' });
      });
    } else {
      return res.status(404).json({ error: 'utilisateur non présent dans la Base de données' });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_get_user_profile = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const userFound = await models.User.findOne({
      attributes: ['id', 'firstname', 'lastname', 'email', 'telephone'],
      where: { id: userId },
    });
    return res.status(200).json(userFound);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_get_all_users = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const users = await models.User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_update_current_user = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pFirstname = req.body.firstname;
  const pLastname = req.body.lastname;
  const pEmail = req.body.email;
  const pTelephone = req.body.telephone;
  const pPassword = req.body.password;

  try {
    const userFound = await models.User.findOne({
      where: { id: userId },
    });

    try {
      const userUpdated = await userFound.update({
        firstName: (pFirstname || userFound.firstname),
        lastName: (pLastname || userFound.lastname),
        email: (pEmail || userFound.email),
        telephone: (pTelephone || userFound.telephone),
        password: (pPassword || userFound.password),
      });
      return res.status(200).json(userUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_update_user_by_id = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const idUserParam = req.params.idUser;
  const pFirstname = req.body.firstname;
  const pLastname = req.body.lastname;
  const pEmail = req.body.email;
  const pTelephone = req.body.telephone;
  const pIsAdmin = req.body.isAdmin;

  try {
    const userFound = await models.User.findOne({
      where: { id: userId },
    });
    if (userFound && userFound.isAdmin === true) {
      try {
        const userToUpdate = await models.User.findOne({
          where: { id: idUserParam },
        });
        try {
          const userUpdated = await userToUpdate.update({
            firstname: (pFirstname || userToUpdate.firstname),
            lastname: (pLastname || userToUpdate.lastname),
            email: (pEmail || userToUpdate.email),
            telephone: (pTelephone || userToUpdate.telephone),
            isAdmin: (pIsAdmin || userToUpdate.isAdmin),
          });
          return res.status(200).json(userUpdated);
        } catch (e) {
          return res.status(400).json({ status: 400, message: e.message });
        }
      } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
      }
    } else {
      return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_delete_current_user = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const userFound = await models.User.findOne({
      where: { id: userId },
    });

    const userDeleted = await userFound.destroy({
      where: { id: userId },
    });
    return res.status(200).json(userDeleted);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.user_delete_user_by_id = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const idUserParam = req.params.idUser;

  try {
    const currentUser = await models.User.findOne({
      where: { id: userId },
    });
    if (currentUser && currentUser.isAdmin === true) {
      try {
        const userToDelete = await models.User.findOne({
          where: { id: idUserParam },
        });

        try {
          const userDeleted = await userToDelete.destroy({
            where: { id: idUserParam },
          });
          return res.status(200).json(userDeleted);
        } catch (e) {
          return res.status(400).json({ status: 400, message: e.message });
        }
      } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
      }
    } else {
      return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
