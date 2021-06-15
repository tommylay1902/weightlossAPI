const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");

const uc = new UserController();

router.post("", uc.createUser);
router.post("/login", uc.loginUser);

module.exports = router;
