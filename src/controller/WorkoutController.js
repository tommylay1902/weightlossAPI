const WorkoutService = require("../services/WorkoutService");
const ExerciseToWorkoutService = require("../services/ExerciseToWorkoutService");
const ExerciseService = require("../services/ExerciseService");

const ws = new WorkoutService();
const etws = new ExerciseToWorkoutService();
const es = new ExerciseService();

module.exports = class WorkoutController {
    async getWorkouts(req, res) {
        try {
            const userId = req.userAuth.id;
            const workouts = await ws.getWorkoutsByUser(userId);

            res.send(workouts);
        } catch (error) {}
    }

    //check this controller later for any any security issues
    //gets workout and all associated exercises to the workout
    async getSpecificWorkout(req, res) {
        try {
            const { workoutId } = req.params;

            const workout = await ws.getExercisesAssociatedToWorkout(workoutId);

            res.send(workout);
        } catch (error) {
            res.send(error.toString());
        }
    }

    async createWorkout(req, res) {
        try {
            const userId = req.userAuth.id;
            await ws.createUserWorkout(req.body, userId);
            return res.sendStatus(201);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    //takes in the id of the workout through params, and the exerciseId in the body to create a record in
    // the ExerciseToWorkout Table
    async addExerciseToWorkout(req, res) {
        try {
            const userId = req.userAuth.id;
            const { workoutId } = req.params;

            const workout = await ws.getWorkoutByIdAndUserId(workoutId, userId);

            if (!workout) return res.sendStatus(404);
            const { exerciseId } = req.body;

            const exercise = await es.getExerciseById(exerciseId);

            if (!exercise) return res.sendStatus(404);

            await etws.create(exerciseId, workoutId);

            return res.sendStatus(200);
        } catch (error) {
            return res.send(error.toString());
        }
    }
};
