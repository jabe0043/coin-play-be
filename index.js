'use strict'

require("dotenv").config();
const cors = require("cors");
const express = require('express');
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const helmet = require('helmet')
const compression = require('compression')
const sanitizeMongo = require('express-mongo-sanitize');
const morgan = require("morgan");
const { errorHandler } = require("./utils/errors");
//-- Application level middleware
const logMiddleware = require('./middlewares/logMiddleware')
const isAuthenticated = require('./middlewares/isAuthenticated');
//-- Application level routers
const userRouter = require('./routes/userRouter');
const authRouter = require("./routes/authRouter");
//-- Mongo Connection
require("./utils/mongoDb");


const app = express()
app.use(compression());
app.use(helmet());
app.use(sanitizeMongo());
app.use(
  cors({
    origin: process.env.CORS_WHITELIST.split(","),
  })
);
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


//-- Middleware setup
app.use(logMiddleware);
// app.use(require('./middlewares/isAuthenticated'));


//-- Routes setup
// app.use('/user', isAuthenticated, UserRouter);
app.get('/', (_req, res) => res.send('Hello World!'));
app.use("/auth", authRouter);
app.use('/user', isAuthenticated, userRouter)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));