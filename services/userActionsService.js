const { NotFoundError, BadRequestError } = require("../utils/errors");
const User = require('../models/userModel');

//-- receives the request from controller and updates user doc;
const buyCoin = async (userId, transactionInfo) => {
  try {
    const { coinId, coinName, coinSymbol, qty, price, date, transactionId } = transactionInfo;
    const user = await User.findOne({ _id: userId }); // Find user's doc
    // Add transaction to the transactions array
    user.transactions.push({
      coinId,
      coinName,
      coinSymbol,
      qty: Number(qty), // Convert qty to number
      price: Number(price), // Convert price to number
      date,
      transactionId,
    });
    // Update portfolio
    user.portfolio.available -= price; // Remove total cost of the transaction from available field
    user.portfolio.invested += price; // Add total cost of the transaction to invested field

    // Update holdings
    const transactionsForCoin = user.transactions.filter((transaction) => transaction.coinId === coinId);
    
    if (transactionsForCoin.length > 0) {
      const totalQty = transactionsForCoin.reduce((sum, transaction) => sum + transaction.qty, 0);
      const totalCost = transactionsForCoin.reduce((sum, transaction) => sum + transaction.price, 0);
      
      const existingHolding = user.holdings.find((holding) => holding.coinSymbol === coinSymbol);
      
      if (existingHolding) {
        // Update existing holding
        existingHolding.totalHeld = totalQty;
        existingHolding.avgCostPerCoin = totalQty > 0 ? totalCost / totalQty : 0;
      } else {
        // Add new holding
        user.holdings.push({
          coinName: coinName,
          coinSymbol: coinSymbol,
          totalHeld: totalQty,
          avgCostPerCoin: totalQty > 0 ? totalCost / totalQty : 0,
        });
      }      
      const updatedUserDoc = await user.save(); // Save the updated user document
      return updatedUserDoc;
    } else {
      throw new Error('No transactions found for the specified coin.');
    }
  } catch (error) {
    throw error;
  }
};









module.exports = {
  buyCoin,
};