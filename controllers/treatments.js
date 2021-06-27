const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.treatments_create_treatment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pPetID = req.body.petID;
  const pMedication = req.body.medication;
  const pStartDate = req.body.startDate;
  const pEndDate = req.body.endDate;
  const pTimesPerDay = req.body.timesPerDay;
  const pStatus = req.body.status;

  try {
    const treatment = await models.Treatment.create({
      petID: pPetID,
      medication: pMedication,
      startDate: pStartDate,
      endDate: pEndDate,
      timesPerDay: pTimesPerDay,
      status: pStatus,
    });
    return res.status(200).json(treatment);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatments_get_all_By_Animal = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatments = await models.Event.findAll({
      where: { animalId: req.params.idAnimal },
    });
    return res.status(200).json(treatments);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatments_get_treatment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatment = await models.Event.findOne({
      where: { id: req.params.idTreatment },
    });
    return res.status(200).json(treatment);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatments_update_treatment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  const pIdTreatment = req.params;
  const pMedication = req.body;
  const pStartDate = req.body;
  const pEndDate = req.body;
  const pTimesPerDay = req.body;
  const pStatus = req.body.status;

  try {
    const treatmentFound = await models.Treatment.findOne({
      where: { id: pIdTreatment },
    });

    try {
      const treatmentUpdated = await models.Treatment.update({
        medication: (pMedication || treatmentFound.medicamentId),
        startDate: (pStartDate || treatmentFound.startDate),
        endDate: (pEndDate || treatmentFound.endDate),
        timesPerDay: (pTimesPerDay || treatmentFound.endDate),
        statut: (pStatus || treatmentFound.statut),
      });
      return res.status(200).json(treatmentUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.treatments_delete_treatment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0) {
    return res.status(400).json({ error: 'Wrong Token' });
  }

  try {
    const treatmentFound = await models.Treatment.findOne({
      where: { id: req.params.idTreatment },
    });
    try {
      const treatmentDeleted = models.Treatment.destroy({
        where: { id: treatmentFound.id },
      });
      return res.status(200).json(treatmentDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
