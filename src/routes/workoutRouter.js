const express = require("express");
const router = express.Router();

const auth = require("../middleware/verifyToken");

const WorkoutController = require("../controller/WorkoutController");
const wc = new WorkoutController();

router.get("/:workoutId", auth, wc.getSpecificWorkout);

//come back to this and think if this belongs in this route
router.post("/:workoutId", auth, wc.addExerciseToWorkout);
router.post("", auth, wc.createWorkout);

module.exports = router;
