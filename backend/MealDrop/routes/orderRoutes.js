const { Router } = require('express');
const orderController = require('../controllers/customerOrderContollers');
const router = Router();

router.post('/api/v1/createOrder', orderController.createOrder);

module.exports = router;