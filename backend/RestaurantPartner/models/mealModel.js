const mongoose = require("mongoose");
const Restaurant = require('./restaurantModel');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please provide an image"],
        trim: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
});

module.exports = mongoose.model('Meal', mealSchema);
