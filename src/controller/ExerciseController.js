const ExerciseService = require("../services/ExerciseService")

const es = new ExerciseService();


module.exports = class ExerciseController{
    async getExercise(req, res){
        try {
            const exercise = await es.getExerciseById(req.params.id);
            if(!exercise) return res.sendStatus(404);
            return res.send(exercise);
        } catch (error) {
            
        }
    }

    async createExercise(req, res){
        //implement validation later

        try {
            const result = await es.createExercise(req.body);
            return res.send(result);
        } catch (error) {
            
        }
    }

    async deleteExercise(req, res){
        try {
           
            const exercise = await es.getExerciseById(req.params.id);
            if(!exercise) return res.sendStatus(404);

            const result = await es.deleteExerciseByInstance();
            return res.send(result);
        } catch (error) {
            
        }
    }

    async updateExercise(req, res){
        //implement validation later
        try {
            const {id} = req.params;

            const exercise = await es.getExerciseById(id);

            if(!exercise) return res.sendStatus(404);

            const result = await es.updateExerciseByInstance(exercise, req.body);

            return res.send(result);

        } catch (error) {
            
        }
    }
}