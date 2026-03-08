const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jitterbit OrderSystem API',
            version: '1.0.0',
            description: 'Order management system API for Jitterbit ',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key'
                }
            }
        },
        security: [{ ApiKeyAuth: [] }]
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);