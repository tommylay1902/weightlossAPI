const { Exercise } = require("../models");

module.exports = class ExerciseServices {
    async getExerciseById(id) {
        try {
            const exercise = await Exercise.findByPk(id);

            return exercise;
        } catch (error) {
            console.log(error);
        }
    }

    async getExerciseByIdAndUserId(id, userId) {
        try {
            const exercise = await Exercise.findOne({
                where: {
                    id,
                    createdBy: userId,
                },
                attributes: {
                    exclude: ["id", "createdAt", "updatedAt", "createdBy"],
                },
            });
            return exercise;
        } catch (error) {}
    }

    async createExercise(data) {
        try {
            const create = await Exercise.create(data);

            return create;
        } catch (error) {
            console.log(error);
        }
    }

    async updateExerciseByInstance(instance, data) {
        try {
            Object.entries(data).forEach(([k, v]) => {
                instance[k] = v;
            });

            await instance.save();

            return instance;
        } catch (error) {}
    }

    async deleteExerciseByInstance(exercise) {
        try {
            await exercise.destroy();
        } catch (error) {
            console.log(error.toString());
        }
    }
};
