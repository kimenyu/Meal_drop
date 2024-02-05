const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'kimenyublogs';

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token.split(' ')[1], jwtSecret); 
        req.customerId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;
