const express = require('express');

const app = express();
const multer = require('multer');

const upload = multer();

const animalsRoutes = require('./routes/pets');
const usersRoutes = require('./routes/user');
const weightsRoutes = require('./routes/weight');
const professionalCategoriesRoutes = require('./routes/professionalCategories');
const professionalsRoutes = require('./routes/professional');
const appointmentsRoutes = require('./routes/appointment');
const vaccinesRoutes = require('./routes/vaccine');
const dewormersRoutes = require('./routes/dewormer');
const treatmentsRoutes = require('./routes/treatments');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use('/users', usersRoutes);
app.use('/animaux', animalsRoutes);
app.use('/poids', weightsRoutes);
app.use('/categoriesProfessionnelles', professionalCategoriesRoutes);
app.use('/professionnels', professionalsRoutes);
app.use('/rendezVous', appointmentsRoutes);
app.use('/vaccins', vaccinesRoutes);
app.use('/vermifuges', dewormersRoutes);
app.use('/traitements', treatmentsRoutes);

// for parsing multipart/form-data
app.use(upload.none());
app.use(express.static('public'));

module.exports = app;
