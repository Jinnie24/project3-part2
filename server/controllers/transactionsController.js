const db = require("../models");


// Defining methods for the TransactionsController
module.exports = {
  findAll: function(req, res) {
    db.Transactions
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findLimit: function(req, res) {
    var limit = parseInt(req.query.limit, 10);
    if (!limit) limit = 5;
    db.Transactions
      .find(req.query)
      .limit(limit)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Transactions
      .findById(req.params.transactionId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Transactions
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      db.Inventory.decrementInventory(transaction.products);
  },
  findToday: function(req, res) {
    if (req.query.date) {
      startDate = new Date(req.query.date);
      startDate.setHours(0, 0, 0, 0);
  
      endDate = new Date(req.query.date);
      endDate.setHours(23, 59, 59, 999);
    } else {
      // beginning of current day
      var startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
  
      // end of current day
      var endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
    }
    db.Transactions
      .find({ date: { $gte: startDate.toJSON(), $lte: endDate.toJSON() } },
      function(err, docs) {
        var result = {
          date: startDate
        };
  
        if (docs) {
          var total = docs.reduce(function(p, c) {
            return p + c.total;
          }, 0.0);
  
          result.total = parseFloat(parseFloat(total).toFixed(2));
  
          res.send(result);
        } else {
          result.total = 0;
          res.send(result);
        }
      }
    );
  },
    findByDay: function(req, res) {
    var startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  
    var endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  
    db.Transactions.find(
      { date: { $gte: startDate.toJSON(), $lte: endDate.toJSON() } },
      function(err, docs) {
        if (docs) res.send(docs);
      }
    );
  }

  // update: function(req, res) {
  //   db.Transactions
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Transactions
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};