const { Macros } = require("../models");

module.exports = class MacroService {
    async getMacrosById(id) {
        const macros = await Macros.findByPk(id);

        return macros;
    }

    async createMacros(data) {
        const result = await Macros.create(data);
        console.log(result);
        return result;
    }

    async updateMacrosById(macros, data) {
        macros.dataValues = { ...macros.dataValues, ...data };

        return macros;
    }
};
