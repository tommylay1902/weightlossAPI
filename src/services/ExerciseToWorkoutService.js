const { ExerciseToWorkouts } = require("../models");

const { Exercise } = require("../models");

module.exports = class WorkoutService {
    async create(exerciseId, workoutId) {
        try {
            await ExerciseToWorkouts.create({ exerciseId, workoutId });
        } catch (error) {
            console.log("etws error", error.toString());
        }
    }
};
