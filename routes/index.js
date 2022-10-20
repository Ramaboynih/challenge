const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const userbio = require("../controllers/userbio");
const userHistory = require("./userHistory");

//Auth
router.post("/auth", auth.create);
router.post("/auth/login", auth.login);

// router.use("/auth", auth);
//UserBIO
router.get("/userBio", userbio.index);
router.post("/userBio/add", userbio.create);
router.put("/userBio/update", userbio.update);

// router.use("/userHistory", userHistory);

module.exports = router;
