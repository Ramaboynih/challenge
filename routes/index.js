const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const userbio = require("../controllers/userbio");
const middleware = require("../helper/middleware");
const userHistory = require("../controllers/userHistory");

//Auth
router.post("/auth", auth.create);
router.post("/auth/login", auth.login);

// router.use("/auth", auth);
//UserBIO
router.get("/userBio", userbio.index);
router.post("/userBio/add", userbio.create);
router.put("/userBio/update", userbio.update);
router.get("/userBio/:id", userbio.show);
router.delete("/userBio/delete", middleware.mustLogin, userbio.delete);

//userHistory
router.post("/History/add", middleware.mustLogin, userHistory.create);
router.get("/History/all", userHistory.index);
router.get("/History/:id", middleware.mustLogin, userHistory.create);
// router.use("/userHistory", userHistory);

module.exports = router;