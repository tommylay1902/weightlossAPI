const { Workouts, Exercise, ExerciseToWorkouts } = require("../models");

module.exports = class WorkoutService {
    //return all exercises associated to the workout
    async getExercisesAssociatedToWorkout(workoutId) {
        try {
            const results = await Workouts.findAll({
                raw: true,
                where: { id: workoutId },
                include: [
                    {
                        model: Exercise,
                        attributes: {
                            //this will exclude attributes of exercise field
                            exclude: [
                                "id",
                                "createdAt",
                                "updatedAt",
                                "createdBy",
                            ],
                        },
                        //this will exclude the nested field, the junction table of ExcerciseToWorkouts
                        through: {
                            attributes: [],
                        },
                    },
                ],
                attributes: {
                    exclude: ["id", "createdAt", "updatedAt", "userId"],
                },
            });
            return results;
        } catch (error) {
            console.log(error.toString());
        }
    }

    async createUserWorkout(data, userId) {
        try {
            await Workouts.create({ ...data, userId });
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
