const { Router } = require('express');
const orderController = require('../controllers/customerOrderContollers'); 
const verifyToken = require('../middleware/authMiddleware');
const router = Router();

/**
 * @swagger
 * /api/v1/createOrder:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Bad request, validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/createOrder', verifyToken, orderController.createOrder);
  
/**
 * @swagger
 * /api/v1/getAllOrders/{customerId}:
 *   get:
 *     summary: Get all orders for a specific customer
 *     parameters:
 *       - name: customerId
 *         in: path
 *         required: true
 *         description: The ID of the customer
 *         schema:
 *           type: string
 *           format: uuid  # Assuming your customer ID is a UUID
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/api/v1/getAllOrders/:customerId', verifyToken, orderController.getCustomerOrders);

  /**
   * @swagger
   * /api/v1/listMeals:
   *   get:
   *     summary: List all meals for customers (from all restaurants)
   *     responses:
   *       '200':
   *         description: Successful response
   *       '500':
   *         description: Internal server error
   */
  router.get('/api/v1/listMeals', orderController.listMeals);
  
  /**
   * @swagger
   * /api/v1/filterByPrice:
   *   get:
   *     summary: Filter meals by price range
   *     parameters:
   *       - name: minPrice
   *         in: query
   *         required: true
   *         description: Minimum price
   *         schema:
   *           type: number
   *       - name: maxPrice
   *         in: query
   *         required: true
   *         description: Maximum price
   *         schema:
   *           type: number
   *     responses:
   *       '200':
   *         description: Successful response
   *       '404':
   *         description: No meals found
   *       '500':
   *         description: Internal server error
   */
  router.get('/api/v1/filterByPrice', orderController.filterByPrice);

  
  /**
   * @swagger
   * /api/v1/updateOrderStatus/{orderId}:
   *   put:
   *     summary: Update order status
   *     parameters:
   *       - name: orderId
   *         in: path
   *         required: true
   *         description: The ID of the order
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 enum: ['pending', 'accepted', 'rejected']
   *             required:
   *               - status
   *     responses:
   *       '200':
   *         description: Successful response
   *       '500':
   *         description: Internal server error
   */
  router.put('/api/v1/updateOrderStatus/:orderId', verifyToken, orderController.updateOrder);

  router.get('/verification', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', userId: req.customerId });
});


module.exports = router;
