const express = require('express');
const router = express.Router();
const catwayCtrl = require('../controllers/catwayCtrl');
const reservationRoutes = require('../routes/reservation');
const auth = require('../middleware/auth');

router.post('/', auth, catwayCtrl.createCatway);
router.get('/', auth, catwayCtrl.getAllCatways);
router.get('/:id', auth, catwayCtrl.getOneCatway);
router.put('/:id', auth, catwayCtrl.modifyCatway);
router.patch('/:id', auth, catwayCtrl.modifyCatway);
router.delete('/:id', auth, catwayCtrl.deleteCatway);

// Nest reservation routes under catway routes
router.use('/:id/reservations', reservationRoutes);

module.exports = router;
