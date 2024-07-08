

const express = require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservationCtrl');
const auth = require('../middleware/auth');


router.post('/:id/reservations', auth, reservationCtrl.createReservation);
router.get('/:id/reservations', auth, reservationCtrl.getReservations);
router.get('/:id/reservations/:idReservation', auth, reservationCtrl.getReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationCtrl.deleteReservation);


router.get('/:id/newReservation', auth, reservationCtrl.renderNewReservationForm);

module.exports = router;
