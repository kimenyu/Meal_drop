const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const router = Router();

router.post('/api/v1/restaurantPartner/create-meal', mealsController.createMeal);
router.delete('/api/v1/restaurantPartner/delete-meal/:id', mealsController.deleteMeal);
router.put('/api/v1/restaurantPartner/update-meal/:id', mealsController.updateMeal);

module.exports = router;