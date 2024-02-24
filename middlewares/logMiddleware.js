
const logMiddleware = (req, res, next) => {
  console.log(`MIDDLEWARE-- ${req.method} request made to ${req.path}.`);
  next();
};


module.exports = logMiddleware;