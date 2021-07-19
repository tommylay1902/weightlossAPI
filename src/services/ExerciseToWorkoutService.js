const { ExerciseToWorkouts } = require("../models");

module.exports = class WorkoutService {
    async create(exerciseId, workoutId) {
        try {
            console.log(exerciseId, workoutId);
            await ExerciseToWorkouts.create({ exerciseId, workoutId });
        } catch (error) {
            console.log(error.toString());
        }
    }
};
