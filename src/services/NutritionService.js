const { Nutrition } = require("../models");

module.exports = class NutritionService {
    async getNutritionById(id) {
        const nutrition = await Nutrition.findByPk(id);

        return nutrition;
    }

    async createNutrition(data) {
        const result = await Nutrition.create(data);

        return result;
    }

    async updateNutritionById(nutrition, data) {
        try {
            Object.entries(data).forEach(([k, v]) => {
                nutrition[k] = v;
            });
            await nutrition.save();
            return nutrition;
        } catch (error) {
            throw new Error("Error updatiing macro by id");
        }
    }

    async deleteNutritionByInstance(nutrition) {
        try {
            await nutrition.destroy();
        } catch (error) {}
    }
};
