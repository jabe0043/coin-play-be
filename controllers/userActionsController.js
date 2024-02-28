
const userActionService = require('../services/userActionsService');

//router redirects to controller. Controller receives request from client and calls appropriate service for handling business logic. 


const buyCoin = async (req, res, next) => {
  try {
    console.log("User INFO: ", req.body.userId);
    console.log("TRANSACTION INFO: ", req.body);
    const userId = req.body.userId;
    const transactionInfo = req.body.transactionInfo;
    const updatedUserDoc = await userActionService.buyCoin(userId, transactionInfo); //-- service handling business logic;
    res.status(200).json({ data: updatedUserDoc }); //-- sending updated doc back to client;
  } catch (error) {
    next(error);
  }
};




module.exports = {
  buyCoin,
};