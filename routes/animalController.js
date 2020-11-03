// Imports
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Constants

// Routes
module.exports = {
    createAnimal: function(req, res) {

        // Get auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var nom = req.body.nom;
        var dateNaissance = req.body.dateNaissance;
        var espece = req.body.espece;
        var genre = req.body.genre;
        var race = req.body.race;

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Wrong Token' });
        }

        if (nom == null) {
            return res.status(400).json({ 'error': 'Missing parameters' });
        }

        models.Utilisateur.findOne({
            where: { id: userId }
        })
        .then(function(userFound) {
            if(userFound){
                models.Animal.create({
                    nom: nom,
                    dateNaissance: dateNaissance,
                    userId: userFound.id,
                    espece: espece,
                    genre: genre,
                    race: race
                })
                .then(function(newAnimal) {
                    return res.status(201).json(newAnimal);
                }) 
                .catch(function(err) {
                    return res.status(500).json({ 'error': err + ' - Ajout nouvel animal impossible' });
                })
            } else {
                return res.status(404).json({ 'error': 'User Not Found' });
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable verify user' });
        });
    }
}
