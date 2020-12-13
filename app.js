// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const animalRoutes = require('./routes/animalController');
const userRoutes = require('./routes/userController');
const poidsRoutes = require('./routes/poidsController');
const categorieProRoutes = require('./routes/categorieProController');
const professionnelRoutes = require('./routes/professionnelController');
const rendezVous = require('./routes/rendezVousController');
const vaccin = require('./routes/vaccinController');
const vermifuge = require('./routes/vermifugeController');
const medicament = require('./routes/medicamentController');
const event = require('./routes/eventController');


// Body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/animals', animalRoutes);
app.use('/poids', poidsRoutes);
app.use('/categorieProfessionnelle', categorieProRoutes);
app.use('/professionnel', professionnelRoutes);
app.use('/rendezVous', rendezVous);
app.use('/vaccin', vaccin);
app.use('/vermifuge', vermifuge);
app.use('/medicament', medicament);
app.use('/event', event);

// for parsing multipart/form-data
app.use(upload.none()); 
app.use(express.static('public'));

module.exports = app;