const db = require("../models");
const async = require("async");

// Defining methods for the InventoryController
module.exports = {
  findAll: function(req, res) {
    db.Inventory
      .find(req.query)
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
  decrementInventory: function(products) {
    async.eachSeries(products, function(transactionProduct, callback) {
      db.Inventory.findById({ _id: transactionProduct._id }, function(
        err,
        product
      ) {
        // catch manually added items (don't exist in inventory)
        if (!product || !product.quantity_on_hand) {
          callback();
        } else {
          var updatedQuantity =
            parseInt(product.quantity_on_hand) -
            parseInt(transactionProduct.quantity);
  
            db.Inventory.update(
            { _id: product._id },
            { $set: { quantity_on_hand: updatedQuantity } },
            {},
            callback
          );
        }
      });
    });
  }
};
