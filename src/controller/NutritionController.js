const validateUpdate = require("../validation/nutrition");
const NutritionService = require("../services/NutritionService");

const ns = new NutritionService();

module.exports = class NutritionController {
    //get nutrition belonging to the logged in user
    async getSpecificNutrition(req, res) {
        try {
            const userId = req.userAuth.id;
            const nId = req.params.id;

            const results = await ns.getNutritionByIdAndUser(nId, userId);

            if (!results) return res.sendStatus(404);

            return res.send(results);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    //gets all nutrition plans from the logged in user
    async getNutrition(req, res) {
        try {
            const userId = req.userAuth.id;
            const results = await ns.getAllNutritionFromUser(userId);
            res.send(results);
        } catch (error) {}
    }

    async createNutrition(req, res) {
        try {
            const userId = req.userAuth.id;

            const createData = { ...req.body, userId };
            await ns.createNutrition(createData);

            return res.sendStatus(201);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    async updateNutrition(req, res) {
        try {
            //validate input
            await validateUpdate.validateAsync(req.body);

            const userId = req.userAuth.id;

            if (req.params.userId) return res.send(400);

            const data = await ns.getNutritionByIdAndUser(
                req.params.id,
                userId
            );

            if (!data) return res.sendStatus(404);

            await ns.updateNutritionById(data, req.body);

            return res.sendStatus(200);
        } catch (error) {
            return res.status(400).send(error);
        }
    }

    async deleteNutrition(req, res) {
        try {
            const userId = req.userAuth.id;
            const macroId = req.params.id;

            const macros = await ns.getNutritionByIdAndUser(macroId, userId);

            if (!macros) return res.sendStatus(404);

            await ns.deleteNutritionByInstance(macros);

            return res.sendStatus(200);
        } catch (error) {
            return res.send(error);
        }
    }
};
