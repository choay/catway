const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationCtrl = require('../controllers/reservationCtrl');
const auth = require('../middleware/auth');

router.get('/', auth, reservationCtrl.getReservations);
router.get('/:idReservation', auth, reservationCtrl.getReservation);
router.post('/', auth, reservationCtrl.createReservation);
router.delete('/:idReservation', auth, reservationCtrl.deleteReservation);

module.exports = router;
