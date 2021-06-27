const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

exports.appointments_create_appointment = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);
  const pAppointmentDate = req.body.dateRendezVous;
  const pAnimalId = req.body.animalId;
  const pProfessionalId = req.body.professionnelId;

  try {
    const appointment = await models.Appointment.create({
      appointmentDate: pAppointmentDate,
      animalID: pAnimalId,
      professionalID: pProfessionalId,
      userID: userId,
    });
    return res.status(200).json(appointment);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.appointments_get_appointments_by_animal = async (req, res) => {
  try {
    const appointments = await models.Appointment.findAll({
      where: { animalId: req.params.idAnimal },
    });
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.appointments_get_all = async (req, res) => {
  const headerAuth = req.headers.authorization;
  const userId = jwtUtils.getUserId(headerAuth);
  try {
    const appointments = await models.Appointment.findAll({
      where: { userID: userId },
    });
    return res.status(200).json(appointments);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.appointments_get_appointment = async (req, res) => {
  try {
    const appointmentFound = await models.Appointment.findOne({
      where: { id: req.params.idAppointment },
    });
    return res.status(200).json(appointmentFound);
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.appointments_update_appointment = async (req, res) => {
  const pIdAppointment = req.params.idAppointment;
  const pAppointmentDate = req.body.appointmentDate;
  const pAnimalID = req.body.animalID;
  const pProfessionalID = req.body.professionalID;

  try {
    const appointmentFound = await models.Appointment.findOne({
      where: { id: pIdAppointment },
    });

    try {
      const appointmentUpdated = await appointmentFound.update({
        dateRendezVous: pAppointmentDate || appointmentFound.appointmentDate,
        animalId: pAnimalID || appointmentFound.animalID,
        professionnelId: pProfessionalID || appointmentFound.professionalID,
      });
      return res.status(200).json(appointmentUpdated);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.appointments_delete_appointment = async (req, res) => {
  try {
    const appointmentFound = await models.RendezVous.findOne({
      where: { id: req.params.idAppointment },
    });

    try {
      const appointmentDeleted = await appointmentFound.destroy({
        where: { id: appointmentFound.id },
      });
      return res.status(200).json(appointmentDeleted);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
