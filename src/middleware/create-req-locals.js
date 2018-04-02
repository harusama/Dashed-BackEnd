module.exports = (req, res, next) => {
   req.locals = req.locals || {};
   next();
};