const {Exercise} = require("../models");

module.exports =  class ExerciseServices {
    async getExerciseById(id) {
        try {
            const exercise = await Exercise.findByPk(id);
            
            return exercise;
        } catch (error) {
            console.log(error)
        }
    }

    async createExercise(data){
        try {
            
            const create = await Exercise.create(data);
            
            return create;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteExerciseByInstance(exercise){
        try {
            await exercise.destroy();
            
        } catch (error) {
            
        }
    }
}