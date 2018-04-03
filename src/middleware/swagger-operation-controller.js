const boom = require('boom');
const jwt = require('jsonwebtoken');
const get = require('lodash/get');

function swaggerOperationController({ controllers }) {
   return function (req, res, next) {
      const operationId = get(req, 'swagger.operation.operationId');
      if (!operationId) {
         return next(boom.notFound('OperationId not found in Swagger definition'));
      }

      const controllerForOperation = controllers[operationId];
      if (!controllerForOperation) {
         return next(boom.notImplemented('Handler not implemented'));
      }

      const endpointsWithoutAuth = ['getRoot', 'getUser', 'createUser', 'verifyUser']
      const token = req.header('x-auth');
      let decoded = {};

      if (!endpointsWithoutAuth.includes(operationId)) {
         try {
            decoded = jwt.verify(token, 'secret');
         } catch (err) {
            return next(boom.unauthorized('Invalid authentication token'));
         }
      }

      const context = {
         models: req.app.locals.models,
         params: req.swagger.params,
         res,
         userId: decoded.id
      };

      return Promise.resolve(controllerForOperation(context))
         .then((result) => {
            req.locals.result = result;
            next();
            //return res.send(201);
         })
         .catch(next);
   }
}

module.exports = swaggerOperationController;