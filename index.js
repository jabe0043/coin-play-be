'use strict'

require("dotenv").config();
const express = require('express');
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
//Application level middleware
const logMiddleware = require('./middlewares/logMiddleware')
const isAuthenticated = require('./middlewares/isAuthenticated');
//Application level routers
const UserRouter = require('./routes/userRouter');
const authRouter = require("./routes/authRouter");

const { errorHandler } = require("./utils/errors");



require("./utils/mongoDb");
const morgan = require('morgan');
const app = express()

app.use(express.json());
app.use(morgan('tiny'));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, _res, next) => { //for logging authenticated user;
  console.log('user', req.user)
  next()
})


//-- Middleware setup
app.use(logMiddleware);
// app.use(require('./middlewares/isAuthenticated'));


//-- Routes setup
// app.use('/user', isAuthenticated, UserRouter);
app.get('/', (_req, res) => res.send('Hello World!'));
app.use("/auth", authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));