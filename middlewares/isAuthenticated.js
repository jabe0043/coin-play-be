const { BadRequestError } = require('../utils/errors');


//test middleware for validating user data. If req.body does not contain user.NAME || user.EMAIL return 400;
const isAuthenticated = (req, res, next) => {
  console.log('running isAuthenticated');
  const { name, email } = req.body;
  try{
    if(!name || !email){
      res.status(400).send({e: "Name and Email are required."});
    } else {
      next();
    }
  }catch(e){
    next(new BadRequestError(e.message));
  }
}


module.exports = isAuthenticated;