const mongoose = require('mongoose');
const Customer = require('../models/customerModel');
const Meal = require('../../RestaurantPartner/models/mealModel');
const Restaurant = require('../../RestaurantPartner/models/restaurantModel');

// create a customer model

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    meals: [{
        meal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Meal',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);