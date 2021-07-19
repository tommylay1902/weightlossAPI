const { Workouts } = require("../models");

module.exports = class WorkoutService {
    async createUserWorkout(name, userId) {
        try {
            await Workouts.create({ name, userId });
        } catch (error) {
            console.log(error.toString());
        }
    }

    async getWorkoutByIdAndUserId(id, userId) {
        try {
            await Workouts.findOne({
                where: {
                    id,
                    userId,
                },
            });

            return Workouts;
        } catch (error) {}
    }
};
