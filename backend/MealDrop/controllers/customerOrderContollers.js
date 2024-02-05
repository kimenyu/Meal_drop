const Order = require('../models/customerOrderModel');
const Customer = require('../models/customerModel');
const Meal = require('../../RestaurantPartner/models/mealModel');
const verifyToken = require('../middleware/authMiddleware');

// create an order
module.exports.createOrder = async (req, res) => {
    const { customer, restaurant, meals } = req.body;

    try {
        // Fetch meal prices from the Meal model
        const mealPrices = await Promise.all(
            meals.map(async meal => {
                const mealData = await Meal.findById(meal.meal, 'price');
                return mealData.price * meal.quantity;
            })
        );

        // Calculate the total amount
        const totalAmount = mealPrices.reduce((total, price) => total + price, 0);

        // Create the order with the calculated totalAmount
        const newOrder = await Order.create({ customer, restaurant, meals, totalAmount, status: 'pending' });

        // Update the corresponding customer with the new order
        await Customer.findByIdAndUpdate(
            customer,
            { $push: { orders: newOrder._id } },
            { new: true }
        );

        res.status(201).json({ order: newOrder });
    } catch (error) {
        // Handle errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ errors: validationErrors });
        } else {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// get all orders for a specific customer
module.exports.getCustomerOrders = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const orders = await Order.find({ customer: customerId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error getting customer orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//list all meals for customers(should list all meals from all restaurants)
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


//filter by price
module.exports.filterByPrice = async(req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
    
        const filteredMeals = await Meal.find({ price: { $gte: minPrice, $lte: maxPrice } }).sort({price: 1});
    
        if (filteredMeals.length === 0) {
            res.status(404).json({ error: 'No meals found' });
            console.log('No meals found');
        } else {
            res.status(200).json({ filteredMeals: filteredMeals });
        }
    } catch (error) {
        console.error('Error filtering meals by price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

//filter by meal


//update order details
module.exports.updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        res.status(200).json({ order: updatedOrder });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};