const { Router } = require('express');
const customerAccountControllers = require('../controllers/customerAccountsController');
const router = Router();

/**
 * @swagger
 * /api/v1/customerAccounts/register:
 *   post:
 *     summary: Register a new customer
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
 *         description: Customer created successfully
 *       '400':
 *         description: Bad request, validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/api/v1/customerAccounts/register', customerAccountControllers.register);

/**
 * @swagger
 * /api/v1/customerAccounts/login:
 *   post:
 *     summary: Customer login
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
router.post('/api/v1/customerAccounts/login', customerAccountControllers.login);


module.exports = router;