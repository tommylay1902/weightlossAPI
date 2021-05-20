const MacroService = require("../services/MacroService");

const ms = new MacroService();

module.exports = class MacroController {
    async getMacros(req, res) {
        try {
            const results = await ms.getMacrosById(req.params.id);

            return res.send(results);
        } catch (error) {
            return res.sendStatus(500);
        }
    }

    async createMacros(req, res) {
        try {
            await ms.createMacros(req.body);
            return res.sendStatus(201);
        } catch (error) {
            return res.send(error);
        }
    }

    async updateMacros(req, res) {
        //implement a validation right here
        const allowedUpdates = [];
        try {
            const data = await ms.getMacrosById(req.params.id);
            if (!data) return res.sendStatus(404);

            const results = await ms.updateMacrosById(data, req.body);
            return res.send(results);
        } catch (error) {
            return res.send(error);
        }
    }

    async deleteMacros(req, res) {
        try {
        } catch (error) {}
    }
};
