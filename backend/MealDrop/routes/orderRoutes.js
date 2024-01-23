const { Router } = require('express');
const orderController = require('../controllers/customerOrderContollers'); 
const router = Router();

router.post('/api/v1/createOrder', orderController.createOrder);
router.get('/api/v1/getAllOrders/:customerId', orderController.getCustomerOrders);
router.get('/api/v1/listMeals', orderController.listMeals);
router.put('/api/v1/updateOrderStatus/:orderId', orderController.updateOrder);
router.get('/api/v1/filterByPrice', orderController.filterByPrice);

module.exports = router;
