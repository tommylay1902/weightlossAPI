const express = require("express");
const router = express.Router();

const MacroController = require("../controller/MacroController");

const mc = new MacroController();

router.get("/:id", mc.getMacros);

router.post("", mc.createMacros);

router.put("/:id", mc.updateMacros);

router.delete("/:id", mc.deleteMacros);

module.exports = router;
