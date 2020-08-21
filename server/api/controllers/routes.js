const Express = require('express');
const middleware = require('../services/middleware');
const controller = require('./controller');

module.exports = Express
    .Router()
    .get('/imageAccess/:id', controller.imageAccess)
    .post('/imageProcess', controller.imageProcess)

