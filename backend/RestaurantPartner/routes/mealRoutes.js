const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const verifyToken = require('../middleware/restaurantPartnerMiddleware');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurant Partner
 *   description: Restaurant partner operations
 */

/**
 * @swagger
 * /api/v1/restaurantPartner/create-meal:
 *   post:
 *     summary: Create a new meal
 *     tags: [Restaurant Partner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meal'
 *     responses:
 *       '201':
 *         description: Meal created successfully
 *       '400':
 *         description: Bad request, validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/restaurantPartner/create-meal', verifyToken, mealsController.createMeal);

/**
 * @swagger
 * /api/v1/restaurantPartner/delete-meal/{id}:
 *   delete:
 *     summary: Delete a meal by ID
 *     tags: [Restaurant Partner]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the meal to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Meal deleted successfully
 *       '404':
 *         description: Meal not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/api/v1/restaurantPartner/delete-meal/:id', verifyToken, mealsController.deleteMeal);

/**
 * @swagger
 * /api/v1/restaurantPartner/update-meal/{id}:
 *   put:
 *     summary: Update a meal by ID
 *     tags: [Restaurant Partner]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the meal to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Meal'
 *     responses:
 *       '200':
 *         description: Meal updated successfully
 *       '404':
 *         description: Meal not found
 *       '500':
 *         description: Internal server error
 */
router.put('/api/v1/restaurantPartner/update-meal/:id', verifyToken, mealsController.updateMeal);

module.exports = router;
