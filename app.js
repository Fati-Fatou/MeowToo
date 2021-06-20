// Imports
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();

const animalRoutes = require('./routes/animals');
const userRoutes = require('./routes/userController');
const poidsRoutes = require('./routes/poidsController');
const categorieProRoutes = require('./routes/categorieProController');
const professionnelRoutes = require('./routes/professionnelController');
const rendezVous = require('./routes/rendezVousController');
const vaccin = require('./routes/vaccinController');
const vermifuge = require('./routes/vermifugeController');
const medicament = require('./routes/medicamentController');
const event = require('./routes/eventController');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/animals', animalRoutes);
app.use('/poids', poidsRoutes);
app.use('/categoriesProfessionnelles', categorieProRoutes);
app.use('/professionnels', professionnelRoutes);
app.use('/rendezVous', rendezVous);
app.use('/vaccins', vaccin);
app.use('/vermifuges', vermifuge);
app.use('/medicaments', medicament);
app.use('/events', event);

// for parsing multipart/form-data
app.use(upload.none()); 
app.use(express.static('public'));

module.exports = app;