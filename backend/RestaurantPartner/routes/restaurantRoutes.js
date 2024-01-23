const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const restaurantController = require('../controllers/restaurantControllers');
const router = Router();

/**
 * @swagger
 * /api/v1/restaurantPartner/create-restaurant:
 *   post:
 *     summary: Create a new restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *               owner:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       '201':
 *         description: Restaurant created successfully
 *       '400':
 *         description: Bad request, validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/restaurantPartner/create-restaurant', restaurantController.createRestaurant);

/**
 * @swagger
 * /api/v1/restaurantPartner/list-restaurants:
 *   get:
 *     summary: List all restaurants
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/api/v1/restaurantPartner/list-restaurants', restaurantController.listRestaurants);

/**
 * @swagger
 * /api/v1/restaurantPartner/delete-restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the restaurant to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Restaurant deleted successfully
 *       '404':
 *         description: Restaurant not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/api/v1/restaurantPartner/delete-restaurants/:id', restaurantController.deleteRestaurant);

/**
 * @swagger
 * /api/v1/restaurantPartner/get-restaurant-orders/{restaurantId}:
 *   get:
 *     summary: Get all customer orders for a specific restaurant
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/api/v1/restaurantPartner/:restaurantId', restaurantController.getRestaurantOrders);

/**
 * @swagger
 * /api/v1/restaurantPartner/list-meals/{restaurantId}:
 *   get:
 *     summary: List meals for a specific restaurant
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Successful response
 *       '500':
 *         description: Internal server error
 */
router.get('/api/v1/restaurantPartner/list-meals/:restaurantId', restaurantController.listMeals);

module.exports = router;
