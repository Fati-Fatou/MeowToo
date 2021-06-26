const models = require('../models');

exports.appointments_create_appointment = async (req, res) => {
    let pAppointmentDate = req.body.dateRendezVous;
    let pAnimalId = req.body.animalId;
    let pProfessionalId = req.body.professionnelId;

    try {
        const appointment = await models.Appointment.create({
            appointmentDate: pAppointmentDate,
            animalID: pAnimalId,
            professionalID: pProfessionalId,
            userID: pUserId
        });
        return res.status(200).json(appointment);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.appointments_get_appointments_by_animal = async (req, res) => {
    try {
        const appointments = await models.Appointment.findAll({
            where: { animalId: req.params.idAnimal }
        });
        return res.status(200).json(appointments);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.appointments_get_all = async (req, res) => {
    try {
        const appointments = await models.Appointment.findAll({
            where: { userID: pUserId }
        });
        return res.status(200).json(appointments);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.appointments_get_appointment = async (req, res) => {
    try {
        const appointmentFound = await models.Appointment.findOne({
            where: { id: req.params.idAppointment }
        });
        return res.status(200).json(appointmentFound);
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.appointments_update_appointment = async  (req, res) => {
    let pIdAppointment = req.params.idAppointment;
    let pAppointmentDate = req.body.appointmentDate;
    let pAnimalID = req.body.animalID;
    let pProfessionalID = req.body.professionalID;

    try {
        const appointmentFound = await models.Appointment.findOne({
            where: { id: pIdAppointment }
        });

        try {
            const appointmentUpdated = await appointmentFound.update({
                dateRendezVous: (pAppointmentDate ? pAppointmentDate : appointmentFound.appointmentDate),
                animalId: (pAnimalID ? pAnimalID : appointmentFound.animalID),
                professionnelId: (pProfessionalID ? pProfessionalID : appointmentFound.professionalID)
            });
            return res.status(200).json(appointmentUpdated);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }
    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};

exports.appointments_delete_appointment = async (req, res) => {
    try {
        const appointmentFound = await models.RendezVous.findOne({
            where: { id: req.params.idAppointment }
        });

        try {
            const appointmentDeleted = await appointmentFound.destroy({
                where: { id: appointmentFound.id }
            });
            return res.status(200).json(appointmentDeleted);
        } catch (e) {
            return res.status(400).json({ 'status': 400, message: e.message });
        }

    } catch (e) {
        return res.status(400).json({ 'status': 400, message: e.message });
    }
};