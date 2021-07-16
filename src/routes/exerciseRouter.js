const express = require("express");
const router = express.Router();

const Controller = require("../controller/ExerciseController");
const ec = new Controller();

router.get("/:id", auth, ec.getExercise);
router.post("", auth, ec.createExercise);
router.delete("/:id", auth, ec.deleteExercise);
router.put("/:id", auth, ec.updateExercise);

module.exports = router;
