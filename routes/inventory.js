const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

// Matches with "/api/inventory"
router.route("/products")
  .get(inventoryController.findAll);

router.route("/product")
  .post(inventoryController.create)
  .put(inventoryController.update);

// Matches with "/api/inventory/:id"
router
  .route("/product/:id")
  .get(inventoryController.findById)
  // .put(inventoryController.update)
  .delete(inventoryController.remove);

module.exports = router;
