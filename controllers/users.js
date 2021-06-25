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

    models.Utilisateur.findOne({
        where: { email: email }
    })
        .then(function (userFound) {
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
        })
        .catch(function (err) {
            return res.status(500).json({ 'error': 'vérification utilisateur impossible' });
        });
}

exports.user_get_user_profile = async (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    
    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        attributes: ['id', 'nom', 'prenom', 'email'],
        where: { id: userId }
    }).then(function (user) {
        if (user) {
            return res.status(201).json(user);
        }
        else {
            return res.status(404).json({ 'error': 'utilisateur non trouvé' });
        }
    });
}

exports.user_get_all_users = async (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound && userFound.isAdmin == 1) {
            models.Utilisateur.findAll({
                attributes: ['id', 'nom', 'prenom', 'email', 'telephone', 'isAdmin'],
            }).then(function (usersList) {
                return res.status(200).json(usersList);
            }).catch(function (error) {
                return res.status(400).json({ 'error': error + ' Erreur récupération liste des utilisateurs' });
            });
        } else {
            return res.status(404).json({ 'error': 'utilisateur non identifié ' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'error': 'vérification utilisateur impossible' });
    });
}

exports.user_update_current_user = async (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    // Params
    var pNom = req.body.nom;
    var pPrenom = req.body.prenom;
    var pEmail = req.body.email;
    var pTelephone = req.body.telephone;
    var pPassword = req.body.password;

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound) {
            userFound.update({
                nom: (pNom ? pNom : userFound.nom),
                prenom: (pPrenom ? pPrenom : userFound.prenom),
                email: (pEmail ? pEmail : userFound.email),
                telephone: (pTelephone ? pTelephone : userFound.telephone),
                password: (pPassword ? pPassword : userFound.password)
            }).then(function (userUpdated) {
                if (userUpdated) {
                    return res.status(200).json(userUpdated);
                } else {
                    return res.status(400).json({ 'error': 'Erreur lors de la modification de l\'utilisateur' });
                }
            }).catch(function (error) {
                return res.status(400).json({ 'Error ': error + ' Echec mise à jour de l\'utilisateur' });
            });
        } else {
            return res.status(400).json({ 'Error ': ' Utilisateur absent de la base de données' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error ': error + ' Récupération de l\'utilisateur impossible' });
    });
}

exports.user_update_user_by_id = async (req, res) => {
    // Params
    var idUserParam = req.params.idUser;
    var pNom = req.body.nom;
    var pPrenom = req.body.prenom;
    var pEmail = req.body.email;
    var pTelephone = req.body.telephone;
    var pIsAdmin = req.body.isAdmin;

    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound && userFound.isAdmin == true) {

            models.Utilisateur.findOne({
                where: { id: idUserParam }
            }).then(function (userToUpdate) {

                if (userToUpdate) {
                    userToUpdate.update({
                        nom: (pNom ? pNom : userToUpdate.nom),
                        prenom: (pPrenom ? pPrenom : userToUpdate.prenom),
                        email: (pEmail ? pEmail : userToUpdate.email),
                        telephone: (pTelephone ? pTelephone : userToUpdate.telephone),
                        isAdmin: (pIsAdmin ? pIsAdmin : userToUpdate.isAdmin)
                    }).then(function (userUpdated) {
                        if (userUpdated) {
                            return res.status(200).json(userUpdated);
                        } else {
                            return res.status(400).json({ 'error': 'Erreur lors de la modification de l\'utilisateur' });
                        }
                    }).catch(function (error) {
                        return res.status(400).json({ 'Error': error + ' L\'utilisateur n\'a pas été mis à jour ' });
                    });

                } else {
                    return res.status(400).json({ 'Error': ' Utilisateur absent de la base de données ' });
                }
            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Récupération de l\'utilisateur impossible' });
            })
        } else {
            return res.status(400).json({ 'Error:': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error:': error + 'Vérification de l\'utilisateur impossible' });
    });
}

exports.user_delete_current_user = async (req, res) => {
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {
        if (userFound) {
            models.Utilisateur.destroy({
                where: { id: userId }
            }).then(function () {
                return res.status(200).json({ 'Message Sucess': 'L\'utilisateur a bien été supprimé' });
            }).catch(function (error) {
                return res.status(400).json({ 'Error': error + ' L\'utilisateur n\'a pas été supprmié' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (error) {
        return res.status(400).json({ 'Error': error + ' Vérification de l\'utilisateur impossible' });
    });
}

exports.user_delete_user_by_id = async (req, res) => {
    // Param
    var idUserParam = req.params.id;
    // Get Auth Header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        return res.status(400).json({ 'error': 'Wrong Token' });
    }

    models.Utilisateur.findOne({
        where: { id: userId }
    }).then(function (userFound) {

        if (userFound && userFound.isAdmin == true) {

            models.Utilisateur.destroy({
                where: { id: idUserParam }
            }).then(function (isDeleted) {
                if (isDeleted == true) {
                    return res.status(200).json({ isDeleted });
                } else {
                    return res.status(400).json({ 'Message Sucess': 'L\'utilisateur n\'a pas été supprimé' });
                }

            }).catch(function (error) {
                return res.status(500).json({ 'Error': error + ' Supression utilisateur impossible' });
            });
        } else {
            return res.status(400).json({ 'Error': ' Utilisateur non trouvé dans la base de donnée OU non admin' });
        }
    }).catch(function (error) {
        return res.status(500).json({ 'Error': error + ' Vérification de l\'utilisateur impossible' });
    });
}