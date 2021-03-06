const express = require("express");

//import jwt middleware
const auth = require("../middleware/verifyToken");

const router = express.Router();

const NutritionController = require("../controller/NutritionController");

const nc = new NutritionController();

router.get("/:id", auth, nc.getSpecificNutrition);

router.get("", auth, nc.getNutrition);

router.post("", auth, nc.createNutrition);

router.put("/:id", auth, nc.updateNutrition);

router.delete("/:id", auth, nc.deleteNutrition);

module.exports = router;
