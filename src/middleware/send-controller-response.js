const debug = require('debug')('mw:send-controller-response');

function statusCodeForRequest(req) {
   switch (req.method) {
      case 'POST':
         return 201;
      case 'GET':
      case 'PATCH':
      case 'PUT':
         return 200;
      case 'DELETE':
         return 204;
      default:
         return null;
   }
}

function sendControllerResponse(req, res, _next) {
   debug(req.locals);
   const statusCode = req.locals.statusCode || statusCodeForRequest(req);
   if (statusCode) {
      res.status(statusCode);
   }

   const { result } = req.locals;
   debug({ statusCode, result });
   return result ? res.json({ data: result }) : res.json();
}

module.exports = sendControllerResponse;
