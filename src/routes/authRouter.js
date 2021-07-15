const express = require("express");
const router = express.Router();

const AuthController = require("../controller/AuthController");
const ac = new AuthController();

router.post("/login", ac.loginUser);
router.post("/refresh", ac.refreshAccessToken);

module.exports = router;
