const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const swaggerTools = require('swagger-tools');

const { db } = require('./db');
const models = require('./models');
const swaggerApi = require('./../api/swagger-api');
const controllers = require('./handlers');
const createReqLocals = require('./middleware/create-req-locals');
const swaggerOperationController = require('./middleware/swagger-operation-controller');
const sendControllerResponse = require('./middleware/send-controller-response');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(createReqLocals);

app.locals.db = db;
app.locals.models = models;

swaggerTools.initializeMiddleware(swaggerApi, middleware => {
   app.use(middleware.swaggerMetadata());
   app.use(middleware.swaggerValidator());
   app.use(middleware.swaggerUi());
   app.use(swaggerOperationController({ controllers }));
   app.use(sendControllerResponse);
   app.use(errorHandler);
});

module.exports = { app };