const db = require("../models");
const async = require("async");

// Defining methods for the InventoryController
module.exports = {
  findAll: function(req, res) {
    db.Inventory
      .find({})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Inventory
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    var newProduct = req.body;
    console.log(newProduct);
    db.Inventory
      .create(newProduct)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Inventory
      .findOneAndUpdate({ _id: req.body._id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Inventory
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  decrementInventory: function(items) {
    async.eachSeries(items, function(transactionItem, callback) {
      db.Inventory.findById({ _id: transactionItem._id }, function(
        err,
        item
      ) {
        // catch manually added items (don't exist in inventory)
        if (!item || !item.quantity_on_hand) {
          callback();
        } else {
          var updatedQuantity =
            parseInt(item.quantity_on_hand) -
            parseInt(transactionItem.quantity);
  
            db.Inventory.update(
            { _id: item._id },
            { $set: { quantity_on_hand: updatedQuantity } },
            {},
            callback
          );
        }
      });
    });
  }
};
