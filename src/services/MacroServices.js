const { Macros } = require("../models");

exports.getMacrosById = async (id) => {
    const macros = await Macros.findByPk(id);

    return macros;
};

exports.createMacros = async (data) => {
    const result = await Macros.create(data);

    return result;
};

exports.updateMacrosById = async (macros, data) => {
    macros.dataValues = { ...macros.dataValues, ...data };

    return macros;
};
