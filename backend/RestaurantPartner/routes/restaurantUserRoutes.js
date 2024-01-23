const { Router } = require('express');
const accountsController = require('../controllers/restaurantUserController');
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Restaurant Partner Authentication
 */

/**
 * @swagger
 * /api/v1/auth/restaurantPartner/register:
 *   post:
 *     summary: Register a new restaurant partner
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       '201':
 *         description: Restaurant partner registered successfully
 *       '400':
 *         description: Bad request, validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/auth/restaurantPartner/register', accountsController.register);

/**
 * @swagger
 * /api/v1/auth/restaurantPartner/login:
 *   post:
 *     summary: Restaurant partner login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 email:
 *                   type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Bad request, passwords do not match
 *       '404':
 *         description: Username not found
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/auth/restaurantPartner/login', accountsController.login);

module.exports = router;
