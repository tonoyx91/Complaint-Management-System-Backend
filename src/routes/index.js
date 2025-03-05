const router = require("express").Router();
const complaintController = require("../controllers/complaintController");
const userController = require("../controllers/UserController");

router.use("/complaints", complaintController);
router.use("/users", userController);

module.exports = router;