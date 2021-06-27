const moment = require('moment');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

exports.vaccines_create_vaccine = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pVaccineDate = req.body.vaccineDate;
  // Add one year to next vaccine
  const vaccineDate = moment(pVaccineDate);
  const pNextVaccineDate = moment(vaccineDate).add(1, 'years');

  const pPetID = req.body.petID;
  const pStatus = req.body.status;

  try {
    const vaccine = await models.Vaccine.create({
      vaccineDate: pVaccineDate,
      nextVaccineDate: pNextVaccineDate,
      petID: pPetID,
      status: pStatus,
    });
    return res.status(200).json(vaccine);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.vaccines_get_vaccine = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const vaccine = await models.Vaccine.findOne({
      where: { id: req.params.idVaccine },
    });

    // Customize Vaccine object to render
    const vaccineDateFormat = moment(vaccine.vaccineDate).format('DD-MM-YYYY');
    const nextVaccineDateFormat = moment(vaccine.nextVaccineDate).format('DD-MM-YYYY');
    const render = {
      vaccineDate: vaccineDateFormat,
      nextVaccineDate: nextVaccineDateFormat,
      petID: vaccine.petID,
      status: vaccine.status,
    };

    return res.status(200).json(render);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.vaccines_get_vaccine_by_pet = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const vaccine = await models.Vaccine.findAll({
      where: { petID: req.params.idPet, statut: 0 },
    });
    return res.status(200).json(vaccine);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.vaccines_update_vaccine = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pIdVaccine = req.params.idVaccine;
  const pVaccineDate = req.body.vaccineDate;
  const pNextVaccineDate = req.body.nextVaccineDate;
  const pPetID = req.body.petID;
  const pStatus = req.body.status;

  try {
    const vaccineToUpdate = await models.Vaccine.findOne({
      where: { id: pIdVaccine },
    });

    try {
      const vaccineUpdated = await vaccineToUpdate.update({
        vaccineDate: (pVaccineDate || vaccineToUpdate.dateVaccin),
        nextVaccineDate: (pNextVaccineDate || vaccineToUpdate.dateProchainVaccin),
        petID: (pPetID || vaccineToUpdate.animalId),
        status: (pStatus || vaccineToUpdate.statut),
      });
      return res.status(200).json(vaccineUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.vaccines_delete_vaccine = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const vaccineToDelete = await models.Vaccine.findOne({
      where: { id: req.params.idVaccine },
    });

    try {
      const vaccineDeleted = await vaccineToDelete.destroy;
      return res.status(200).json(vaccineDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
