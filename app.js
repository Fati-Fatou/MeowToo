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

// Body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/animals', animalRoutes);
app.use('/user', userRoutes);
app.use('/poids', poidsRoutes);
app.use('/categorieProfessionnelle', categorieProRoutes);
app.use('/professionnel', professionnelRoutes);

// for parsing multipart/form-data
app.use(upload.none()); 
app.use(express.static('public'));

module.exports = app;