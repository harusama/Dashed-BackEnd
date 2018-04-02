const boom = require('boom');
const get = require('lodash/get');

function swaggerOperationController({ controllers }) {
   return function (req, res, next) {
      const operationId = get(req, 'swagger.operation.operationId');
      if (!operationId) {
         return next(boom.notFound('operationId not found in Swagger definition'));
      }

      const controllerForOperation = controllers[operationId];
      if (!controllerForOperation) {
         return next(boom.notImplemented('Handler not implemented'));
      }

      const context = {
         models: req.app.locals.models,
         params: req.swagger.params
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