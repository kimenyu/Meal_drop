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

//list meals
module.exports.listMeals = async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.status(200).json({ meals });
        console.log(meals);
    } catch (error) {
        console.error('Error listing meals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//delete meals by id
module.exports.deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMeal = await Meal.findByIdAndDelete(id);

        if (deletedMeal) {
            // Find the corresponding restaurant
            const restaurant = await Restaurant.findById(deletedMeal.restaurant);

            if (restaurant) {
                // Remove the meal's ID from the restaurant's meals array
                restaurant.meals.pull(deletedMeal._id);
                await restaurant.save();
            }

            res.status(200).json({ message: 'Meal deleted successfully' });
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        console.error('Error deleting meal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//update meals
module.exports.updateMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image } = req.body;
        const updatedMeal = await Meal.findByIdAndUpdate(
            id,
            { name, description, price, image },
            { new: true }
        );
        if (updatedMeal) {
            res.status(200).json({ meal: updatedMeal });
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (error) {
        console.error('Error updating meal:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 