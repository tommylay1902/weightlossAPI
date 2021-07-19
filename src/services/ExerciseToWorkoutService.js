const { ExerciseToWorkouts } = require("../models");

module.exports = class WorkoutService {
    async create(exerciseId, workoutId) {
        try {
            await ExerciseToWorkouts.create({ exerciseId, workoutId });
        } catch (error) {
            console.log(error.toString());
        }
    }
};
