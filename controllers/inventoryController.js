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
      .findById(req.body._id)
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
  
  updateByTransaction: function(products, invoiceType) {
    async.eachSeries(products, function(transactionProduct, callback) {
      db.Inventory.findOne({ _id: transactionProduct._id }, function(
        err,
        product
      ) {
        if(invoiceType = "add"){
          var updatedQuantity =
            parseInt(poduct.quantity) +
            parseInt(transactionProduct.quantity);
        } else if (invoiceType = "subtract") {
          var updatedQuantity =
            parseInt(poduct.quantity) -
            parseInt(transactionProduct.quantity);
        }
          db.Inventory.update(
            { _id: product._id },
            { $set: { quantity: updatedQuantity } },
            {},
            callback
          );
      });
    });
  }
};
