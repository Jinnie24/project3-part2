const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");


router.route("/products")
  .get(inventoryController.findAll);

router.route("/product")
  .post(inventoryController.create)
  .put(inventoryController.update);


router
  .route("/product/:id")
  .get(inventoryController.findById)
  // .put(inventoryController.update)
  .delete(inventoryController.remove);

module.exports = router;
