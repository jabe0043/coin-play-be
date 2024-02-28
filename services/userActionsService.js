const { NotFoundError, BadRequestError } = require("../utils/errors");
const User = require('../models/userModel');

// receives the request from controller and updates user doc;

const buyCoin = async (userId, transactionInfo) => {
  try {
    const { coinId, coinName, coinSymbol, qty, price, date, transactionId } = transactionInfo;
    const user = await User.findOne({ _id: userId }); // Find user's doc
    user.holdings.push({
      coinId,
      coinName,
      coinSymbol,
      qty,
      price,
      date,
      transactionId,
    });

    // Update portfolio
    user.portfolio.available -= price; //-- removing total cost of transaction from available field;
    user.portfolio.invested += price; //-- adding total cost of transaction to invested field;
    const updatedUserDoc = await user.save(); //-- Save the updated user document
    return updatedUserDoc;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
};



module.exports = {
  buyCoin,
};