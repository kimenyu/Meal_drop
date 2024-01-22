const { Router } = require('express');
const orderController = require('../controllers/customerOrderContollers'); 
const router = Router();

router.post('/api/v1/createOrder', orderController.createOrder);
router.get('/api/v1/getAllOrders/:customerId', orderController.getCustomerOrders);
router.get('/api/v1/listMeals', orderController.listMeals);
module.exports = router;