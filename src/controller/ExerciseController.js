const ExerciseService = require("../services/ExerciseService");
const validateExercise = require("../validation/exercise");

const es = new ExerciseService();

module.exports = class ExerciseController {
    async getExercise(req, res) {
        try {
            const userId = req.userAuth.id;
            const exercise = await es.getExerciseByIdAndUserId(
                req.params.id,
                userId
            );

            if (!exercise) return res.sendStatus(404);

            return res.send(exercise);
        } catch (error) {}
    }

    async createExercise(req, res) {
        //implement validation later
        try {
            await validateExercise.validateAsync(req.body);

            const userId = req.userAuth.id;

            const createData = { ...req.body, createdBy: userId };
            const result = await es.createExercise(createData);
            return res.send(result);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    //maybe change to one query in the future?
    async deleteExercise(req, res) {
        try {
            const userId = req.userAuth.id;

            const exercise = await es.getExerciseByIdAndUserId(
                req.params.id,
                userId
            );

            if (!exercise) return res.sendStatus(404);

            await es.deleteExerciseByInstance(exercise);
            return res.sendStatus(200);
        } catch (error) {}
    }

    async updateExercise(req, res) {
        try {
            await validateExercise.validateAsync(req.body);

            const userId = req.userAuth.id;
            const { id } = req.params;

            const exercise = await es.getExerciseByIdAndUserId(id, userId);

            if (!exercise) return res.sendStatus(404);

            const result = await es.updateExerciseByInstance(
                exercise,
                req.body
            );

            return res.send(result);
        } catch (error) {}
    }
};
