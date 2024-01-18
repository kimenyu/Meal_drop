const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const router = Router();

router.post('/api/v1/restaurantPartner/create-meal', mealsController.createMeal);

module.exports = router;