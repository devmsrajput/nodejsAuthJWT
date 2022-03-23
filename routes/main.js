const express = require("express");
const router = express.Router();
const { myController } = require("../controllers/myController.js");
const auth = require("../middlewares/authToken.js");

router.get("/", auth, myController.home);
router.get("/register", auth, myController.signup);
router.post("/register", myController.signingup);
router.get("/login", auth, myController.signin);
router.post("/login", myController.signingin);
router.get("/:content", auth, myController.dashboard);
router.get("/:content/logout", auth, myController.signout);

module.exports = router;
