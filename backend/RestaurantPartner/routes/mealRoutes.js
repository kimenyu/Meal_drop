const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const router = Router();

router.post('/api/v1/restaurantPartner/create-meals', mealsController.createMeal);
router.get('/api/v1/restaurantPartner/list-meals', mealsController.listMeals);

module.exports = router;