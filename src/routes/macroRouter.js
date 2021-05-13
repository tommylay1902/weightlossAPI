const express = require("express");
const router = express.Router();

const {
    getMacros,
    createMacros,
    updateMacros,
} = require("../controller/MacroController");

router.get("/:id", getMacros);

router.post("", createMacros);

router.put("/:id", updateMacros);

module.exports = router;
