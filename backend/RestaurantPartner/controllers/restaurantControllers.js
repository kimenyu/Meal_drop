const Restaurant = require('../models/restaurantModel');
const Meal = require('../models/mealModel');
const User = require('../models/restaurantUserModel');
const order = require('../../MealDrop/models/customerOrderModel');

//create a restaurant
module.exports.createRestaurant = async (req, res) => {
    const { name, description, address, image, owner } = req.body;

    try {
        const restaurant = await Restaurant.create({ name, description, address, image, owner });
        res.status(201).json({ restaurant });
        console.log(restaurant);
        
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., required fields)
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors: validationErrors });
        } else {
            // Handle other types of errors
            console.error('Error creating restaurant:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

//list all restaurants

module.exports.listRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json({ restaurants });
    }
    catch (error) {
        console.error('Error listing restaurants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//delete a restaurant
module.exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

        // Delete all meals associated with the deleted restaurant
        if (deletedRestaurant) {
            const relatedMeals = await Meal.find({ _id: { $in: deletedRestaurant.meals } });

            if (relatedMeals.length > 0) {
                await Meal.deleteMany({ _id: { $in: relatedMeals.map(meal => meal._id) } });
            }
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error("Error deleting restaurant: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//get all customer orders for a specific restaurant
module.exports.getRestaurantOrders = async (req, res) => {
    const restaurantId = req.params.restaurantId;

    try {
        const orders = await order.find({ restaurant: restaurantId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error getting restaurant orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//list meals for a specific restaurant. can also be added to customers api.
module.exports.listMeals = async (req, res) => {
    const restaurantId = req.params.restaurantId;

    try {
        const meals = await Meal.find({ restaurant: restaurantId });
        res.status(200).json({ meals });
    } catch (error) {
        console.error('Error listing meals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};