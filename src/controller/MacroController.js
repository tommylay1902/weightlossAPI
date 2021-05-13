const {
    getMacrosById,
    createMacros,
    updateMacrosById,
} = require("../services/MacroServices");

exports.getMacros = async (req, res) => {
    try {
        const results = await getMacrosById(req.params.id);

        return res.send(results);
    } catch (error) {
        return res.sendStatus(500);
    }
};

exports.createMacros = async (req, res) => {
    try {
        await createMacros(req.body);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error);
    }
};

exports.updateMacros = async (req, res) => {
    //implement a validation right here
    const allowedUpdates = [];
    try {
        const data = await getMacrosById(req.params.id);
        if (!data) return res.sendStatus(404);

        const results = await updateMacrosById(data, req.body);
        return res.send(results);
    } catch (error) {
        return res.send(error);
    }
};
