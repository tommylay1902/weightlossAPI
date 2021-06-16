const express = require("express");
const router = express.Router();

const Controller = require("../controller/ExerciseController");
const ec = new Controller();

router.get( "/:id", ec.getExercise);
router.post("", ec.createExercise);
router.delete("/:id", ec.deleteExercise);
router.put("/:id", ec.updateExercise);

module.exports = router;
