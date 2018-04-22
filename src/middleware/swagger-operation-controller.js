const boom = require('boom');
const jwt = require('jsonwebtoken');
const get = require('lodash/get');

function swaggerOperationController({ controllers }) {
   return async function (req, res, next) {
      const operationId = get(req, 'swagger.operation.operationId');
      if (!operationId) {
         return next(boom.notFound('OperationId not found in Swagger definition'));
      }

      const controllerForOperation = controllers[operationId];
      if (!controllerForOperation) {
         return next(boom.notImplemented('Handler not implemented'));
      }

      const endpointsWithoutAuth = ['getRoot', 'getUser', 'createUser', 'verifyUser', 'getStates'];
      const token = req.header('x-auth');
      let user;
      
      if (!endpointsWithoutAuth.includes(operationId)) {
         try {
            let decoded = jwt.verify(token, 'secret');
            let attributes = {
               id: decoded.id,
               token
            };
            const { User, UserSubject } = req.app.locals.models;
            user = await User.getOne({ attributes });

            attributes = { userId: user.id };
            const userSubjects = await UserSubject.getManyWith({ attributes });
            const subjects = userSubjects.map(userSubject => {
               return {
                  id: userSubject.subject.id,
                  name: userSubject.subject.name
               };
            });

            user.subjects = subjects;
         } catch (err) {
            return next(boom.unauthorized('Invalid authentication token'));
         }
      }

      const context = {
         models: req.app.locals.models,
         params: req.swagger.params,
         io: req.app.locals.io,
         res,
         user
      };

      return Promise.resolve(controllerForOperation(context))
         .then((result) => {
            req.locals.result = result;
            next();
         })
         .catch(next);
   }
}

module.exports = swaggerOperationController;