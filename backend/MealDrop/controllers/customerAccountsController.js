const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Customer = require('../models/customerModel');

const jwtSecret = process.env.JWT_SECRET || 'kimenyublogs';

module.exports.register = async (request, response) => {
  // Validate email, password, username
  const registrationValidation = [
    body('email').isEmail().normalizeEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 6 }),
  ];

  // Check for validation errors
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if email already exists
    const existingEmailUser = await Customer.findOne({ email: request.body.email });
    if (existingEmailUser) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    // Check if username already exists
    const existingUsernameUser = await Customer.findOne({ username: request.body.username });
    if (existingUsernameUser) {
      return response.status(400).json({ error: 'Customer already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    // Create a new user instance
    const customer = new Customer({
      email: request.body.email,
      password: hashedPassword,
      username: request.body.username,
    });

    // Save the new user
    const result = await customer.save();

    // Return success if the new user is added to the database successfully
    response.status(201).json({
      message: 'Customer Created Successfully',
      result,
    });
  } catch (error) {
    console.error('Registration error:', error);
    response.status(500).json({
      message: 'Error creating customer',
    });
  }
};

module.exports.login = async (request, response) => {
  try {
    const { username, password } = request.body;

    // Check if username exists
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return response.status(404).json({
        message: 'Username not found',
      });
    }

    // Compare the password entered and the hashed password found
    const passwordCheck = await bcrypt.compare(password, customer.password);

    if (!passwordCheck) {
      return response.status(400).json({
        message: 'Passwords do not match',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: customer._id,
        userEmail: customer.email,
      },
      jwtSecret,
      { expiresIn: '1d' } // Adjust the expiry time as needed
    );

    // Return success response
    response.status(200).json({
      message: 'Login successful',
      email: customer.email,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({
      message: 'Internal server error',
    });
  }
};
