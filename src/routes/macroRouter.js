const express = require("express");

//import jwt middleware
const verify = require("../middleware/verifyToken");

const router = express.Router();

const MacroController = require("../controller/MacroController");

const mc = new MacroController();

router.get("/:id", verify, mc.getMacros);

router.post("", mc.createMacros);

router.put("/:id", mc.updateMacros);

router.delete("/:id", mc.deleteMacros);

module.exports = router;
