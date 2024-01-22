const { Router } = require('express');
const mealsController = require('../controllers/mealControllers');
const restaurantController = require('../controllers/restaurantControllers');
const router = Router();

router.post('/api/v1/restaurantPartner/create-restaurant', restaurantController.createRestaurant);
router.get('/api/v1/restaurantPartner/list-restaurants', restaurantController.listRestaurants);
router.delete('/api/v1/restaurantPartner/delete-restaurants/:id', restaurantController.deleteRestaurant);
router.get('/api/v1/restaurantPartner/:restaurantId', restaurantController.getRestaurantOrders);
router.get('/api/v1/restaurantPartner/list-meals/:restaurantId', restaurantController.listMeals);

module.exports = router;