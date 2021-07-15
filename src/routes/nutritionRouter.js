const express = require("express");

//import jwt middleware
const verify = require("../middleware/verifyToken");

const router = express.Router();

const NutritionController = require("../controller/NutritionController");

const nc = new NutritionController();

router.get("/:id", verify, nc.getNutrition);

router.post("", nc.createNutrition);

router.put("/:id", nc.updateNutrition);

router.delete("/:id", nc.deleteNutrition);

module.exports = router;
