const { Macros } = require("../models");

exports.getMacrosById = async (id) => {
    const macros = await Macros.findByPk(id);

    return macros;
};

exports.createMacros = async (data) => {
    const result = await Macros.create(data);

    return result;
};
