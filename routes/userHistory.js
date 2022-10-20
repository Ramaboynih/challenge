const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const mid = require("../helper/middleware");

router.post("/", mid.mustLogin, controller.userHistory.create);
router.get("/index", controller.userHistory.index);

module.exports = router;