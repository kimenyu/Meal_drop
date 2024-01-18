const Meal = require('../models/mealModel');
const Restaurant = require('../models/restaurantModel');

// create a meal
module.exports.createMeal = async (req, res) => {
    const { name, description, price, image, restaurant } = req.body;

    try {
        // Create the meal
        const newMeal = await Meal.create({ name, description, price, image, restaurant });

        // Update the corresponding restaurant with the new meal
        await Restaurant.findByIdAndUpdate(
            restaurant,
            { $push: { meals: newMeal._id } },
            { new: true }
        );

        res.status(201).json({ meal: newMeal });
    } catch (error) {
        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., required fields)
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors: validationErrors });
        } else {
            // Handle other types of errors
            console.error('Error creating meal:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};