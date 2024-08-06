const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/auth");
router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/protected-route", verifyToken, userController.protectedRoute);
module.exports = router;
