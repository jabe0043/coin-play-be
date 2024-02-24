const { Router } = require('express');
const UserRouter = Router();


// In-memory array to store user data
const users = [{name: 'jad', email:'jad@gmail.com'}, {name:'john', email:'john@gmail.com'}];

UserRouter.post('/', (req, res) => {
  console.log('Middleware reached');
  try {
    const { name, email } = req.body;
    const newUser = { name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = UserRouter;
