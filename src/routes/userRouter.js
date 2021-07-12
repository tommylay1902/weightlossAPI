const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/verifyToken");
const UserController = require("../controller/UserController");

const uc = new UserController();

router.post("", uc.createUser);
router.post("/login", uc.loginUser);
router.delete("/delete", authMiddleware, uc.deleteUser)

module.exports = router;