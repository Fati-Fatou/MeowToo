const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

exports.user_register = async (req, res) => {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let telephone = req.body.telephone;
    let password = req.body.password;

    if (firstName == null || lastName == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'Email invalide' });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'Mot de passe invalide' });
    }

    try {
        const userFound = await models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        });

        if (!userFound) {
            bcrypt.hash(password, 5, function (err, bycryptedPassword) {
               try {
                const newUser = models.User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    telephone: telephone,
                    password: bycryptedPassword,
                    isAdmin: 0
                });
                return res.status(200).json(newUser);
               } catch (e) {
                return res.status(400).json({ 'status': 400, message: e.message });
               }
            });
        } else {
            return res.status(409).json({ 'error': 'User already exist' });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_login = async (req, res) => {
    
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'paramètres manquants' });
    }

    try {
        const userFound = await models.User.findOne({
            where: { email: email }
        });

        if (userFound) {
            bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                if (resBycrypt) {
                    return res.status(201).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                } else {
                    return res.status(403).json({ 'error': 'password invalide' });
                }
            });
        } else {
            return res.status(404).json({ 'error': 'utilisateur non présent dans la Base de données' });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_get_user_profile = async (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);
    
    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const userFound = await models.User.findOne({
            attributes: ['id', 'firsName', 'lastName', 'email', 'telephone'],
            where: { id: userId }
        });
        return res.status(200).json(userFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_get_all_users = async (req, res) => {
    
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const users = await models.User.findOne({
            where: { id: userId }
        });

    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_update_current_user = async (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    let pFirstName = req.body.firstName;
    let pLastName = req.body.lastName;
    let pEmail = req.body.email;
    let pTelephone = req.body.telephone;
    let pPassword = req.body.password;

    try {
        const userFound = await models.User.findOne({
            where: { id: userId }
        });

        try {
            const userUpdated = await userFound.update({
                firstName: (pFirstName ? pFirstName : userFound.firstName),
                lastName: (pLastName ? pLastName : userFound.lastName),
                email: (pEmail ? pEmail : userFound.email),
                telephone: (pTelephone ? pTelephone : userFound.telephone),
                password: (pPassword ? pPassword : userFound.password)
            });
            return res.status(200).json(userUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_update_user_by_id = async (req, res) => {

    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    let idUserParam = req.params.idUser;
    let pFirstName = req.body.firstName;
    let pLastName = req.body.lastName;
    let pEmail = req.body.email;
    let pTelephone = req.body.telephone;
    let pIsAdmin = req.body.isAdmin;

    try {
        const userFound = await models.User.findOne({
            where: { id: userId }
        });
        if (userFound && userFound.isAdmin == true) {
            try {
                const userToUpdate = models.User.findOne({
                    where: { id: idUserParam }
                });

                try {
                    const userUpdated = await userToUpdate.update({
                        nom: (pFirstName ? pFirstName : userToUpdate.firstName),
                        prenom: (pLastName ? pLastName : userToUpdate.lastName),
                        email: (pEmail ? pEmail : userToUpdate.email),
                        telephone: (pTelephone ? pTelephone : userToUpdate.telephone),
                        isAdmin: (pIsAdmin ? pIsAdmin : userToUpdate.isAdmin)
                    });
                    return res.status(200).json(userUpdated);
                } catch (e) {
                    return res.status(400).json({ 'status': 400, message: e.message });
                }
            } catch (e) {
                return res.status(400).json({ 'status': 400, message: e.message });
            }
        } else {
            return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_delete_current_user = async (req, res) => {
    
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    try {
        const userFound = await models.User.findOne({
            where: { id: userId }
        });

        const userDeleted = await userFound.destroy({
            where: { id: userId }
        });
        return res.status(200).json(userDeleted);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}

exports.user_delete_user_by_id = async (req, res) => {

    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    let idUserParam = req.params.idUser;

    try {
        const currentUser = await models.User.findOne({
            where: { id: userId }
        });
        if (currentUser && currentUser.isAdmin == true) {

            try {
                const userToDelete = models.User.findOne({
                    where: { id: idUserParam }
                });

                try {
                    const userDeleted = await userToDelete.destroy({
                        where: { id: idUserParam }
                    });
                    return res.status(200).json(userDeleted);
                } catch (e) {
                    return res.status(400).json({ 'status': 400, message: e.message });
                }
            } catch (e) {
                return res.status(400).json({ 'status': 400, message: e.message });
            }
        } else {
            return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
}