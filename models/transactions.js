const mongoose = require("mongoose");
var Inventory = require("./inventory");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    date: { type: Date, default: Date.now },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Inventory"
     }],
    invoiceType: {
        type: String, 
        required: true, 
        enum: ["add", "subtract", "write-off"] 
    },
    total: {type: Number, required: true }
});

const Transactions = mongoose.model("Transactions", TransactionsSchema);

module.exports = Transactions;
