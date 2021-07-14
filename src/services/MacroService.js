const { Macros } = require("../models");

module.exports = class MacroService {
    async getMacrosById(id) {
        const macros = await Macros.findByPk(id);

        return macros;
    }

    async createMacros(data) {
        const result = await Macros.create(data);

        return result;
    }

    async updateMacrosById(macros, data) {
        try {
            Object.entries(data).forEach(([k, v]) => {
                macros[k] = v;
            });
            await macros.save();
            return macros;
        } catch (error) {
            throw new Error("Error updatiing macro by id");
        }
    }

    async deleteMacrosByInstance(macros) {
        try {
            await macros.destroy();
        } catch (error) {}
    }
};
