const router = require("express").Router();
const inventoryRoutes = require("./inventory");
const transactionsRoutes = require("./transactions");

// Book routes
router.use("/inventory", inventoryRoutes);
router.use("/transactions", transactionsRoutes);

module.exports = router;
