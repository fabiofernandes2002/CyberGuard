const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Backend da Aplicação CyberGuard da segurança cibernética ',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos que contêm as rotas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
