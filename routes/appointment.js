const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');


router.post('/', appointmentController.appointments_create_appointment);

router.get('/:idAnmal', appointmentController.appointments_get_appointments_by_animal);

router.get('/', appointmentController.appointments_get_all);

router.get('/:idAppointment', appointmentController.appointments_get_appointment);

router.patch('/:idAppointment', appointmentController.appointments_update_appointment);

router.delete('/:idAppointment', appointmentController.appointments_delete_appointment);

module.exports = router;