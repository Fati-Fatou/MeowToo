const express = require('express');

const router = express.Router();
const appointmentController = require('../controllers/appointment');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, appointmentController.appointments_create_appointment);
router.get('/:idAnmal', checkAuth, appointmentController.appointments_get_appointments_by_animal);
router.get('/', checkAuth, appointmentController.appointments_get_all);
router.get('/:idAppointment', checkAuth, appointmentController.appointments_get_appointment);
router.patch('/:idAppointment', checkAuth, appointmentController.appointments_update_appointment);
router.delete('/:idAppointment', checkAuth, appointmentController.appointments_delete_appointment);

module.exports = router;
