// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Car Management System API',
        description: 'Car Management Application for efficient car inventory management with user authentication, car details management, and secure access via JWT authentication.'
    },
    host: process.env.SERVER_URI
}

const outputFile = './swagger-output.json'
const routes = ['./routes/*.js'];

// const swaggerSpec = swaggerJsdoc(options);
swaggerAutoGen(outputFile, routes, doc)
