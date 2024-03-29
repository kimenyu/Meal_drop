const mongoose = require("mongoose");
const Meal = require('./mealModel');
const User = require('./restaurantUserModel');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Please provide an image"],
        trim: true,
    },
    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);