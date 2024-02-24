'use strict'
require("dotenv").config();

const express = require('express')
const MongoStore = require("connect-mongo");
//Application level middleware
const logMiddleware = require('./middlewares/logMiddleware')
const isAuthenticated = require('./middlewares/isAuthenticated');
//Application level routers
const UserRouter = require('./routes/userRouter');

require("./utils/mongoDb");
const app = express()
app.use(express.json());


//-- Middleware setup
app.use(logMiddleware);
// app.use(require('./middlewares/isAuthenticated'));


//-- Routes setup
app.use('/user', isAuthenticated, UserRouter);



app.get('/', (_req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));