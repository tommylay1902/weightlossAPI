const express = require("express");
const router = express.Router();
const auth = require("../middleware/verifyToken");
const UserController = require("../controller/UserController");

const uc = new UserController();

router.get("/me", auth, uc.getUser);
router.post("", uc.createUser);
router.delete("/delete", auth, uc.deleteUser);

module.exports = router;
