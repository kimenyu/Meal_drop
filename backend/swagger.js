const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MealDrop API',
      version: '1.0.0',
    },
  },
  // Update the path to include your routes directory
  apis: [
    path.resolve(__dirname, './MealDrop/routes/*.js'),
    path.resolve(__dirname, './RestaurantPartner/routes/*.js')
  ],
  
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
