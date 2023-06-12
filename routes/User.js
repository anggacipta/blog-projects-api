const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", userController.profile);
router.post("/logout", userController.logout);

module.exports = router;
