const express = require("express");
const router = express.Router();

const { getMacros, createMacros } = require("../controller/MacroController");

router.get("/:id", getMacros);

router.post("", createMacros);

module.exports = router;
