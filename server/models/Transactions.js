const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    items: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Inventory' 
    },
    _id: {type: Number, required: true}
  });
  
  
const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;

