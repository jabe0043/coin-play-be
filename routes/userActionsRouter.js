const { Router } = require("express");
const userActionsController = require('../controllers/userActionsController');

/* For controlling user actions: BUY, SELL, FAVOURITES ETC. */
/*  */
const UserActionsRouter = Router();


UserActionsRouter.patch('/buy', userActionsController.buyCoin);



module.exports = UserActionsRouter;
