const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    //-- User's name as per Google auth
    name: {
      type: String,
      required: true,
    },
    //-- Reference to ownerID in authSchema
    _id: {
      type: Types.ObjectId,
      required: true,
    },
    //-- The account portfolio - Total balance, Available funds, Invested funds
    portfolio: {
      balance: {
        type: Number,
        default: 10000,
        required: true,
      },
      invested: {
        type: Number,
        default: 0,
        required: true,
      },
      available: {
        type: Number,
        default: 10000,
        required: true,
      },
    },
    //-- Array of objects representing user's stock holdings
    holdings: [
      {
        stock: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    //-- Array of stock symbols in the user's watchlist
    watchList: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);