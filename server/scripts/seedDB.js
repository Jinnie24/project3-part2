const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/pos"
);

const inventorySeed = [
  {
    name: "The Dead Zone",
    quantity: 3,
    price: 10,
    _id: 1,
    date: new Date(Date.now())
  },
  {
    name: "Awesome Item",
    quantity: 6,
    price: 20,
    _id: 2,
    date: new Date(Date.now())
  }
];

db.Inventory
  .remove({})
  .then(() => db.Inventory.collection.insertMany(inventorySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
