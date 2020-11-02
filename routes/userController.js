// Imports
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var models = require('../models');

//Routes
module.exports = {
    register: function(req, res) {
        
        // Params
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var password = req.body.prenom;

        if (nom == null || prenom == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        // TODO verify mail regex, password etc
    },
    login: function(req, res) {
        // TODO: To implement
    }
}