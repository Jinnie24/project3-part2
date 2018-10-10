const router = require("express").Router();
const transactionsController = require("../../controllers/transactionsController");

// Matches with "/api/transactions"
router.route("/all")
  .get(transactionsController.findAll);

router.route("/limit")
  .get(transactionsController.findLimit);

router.route("/new")
  .post(transactionsController.create);

// Matches with "/api/transactions/:id"
router.route("/:transactionId")
  .get(transactionsController.findById);
  // .put(transactionsController.update)
  // .delete(transactionsController.remove);

router.route("/day-total")
  .get(transactionsController.findToday);

router.route("/by-date")
  .get(transactionsController.findByDay);

module.exports = router;
