const { Nutrition } = require("../models");
const { Op } = require("sequelize");

module.exports = class NutritionService {
    //gets an indiviual Nutrition record from the user logged in
    async getNutritionByIdAndUser(id, userId) {
        const nutrition = await Nutrition.findOne({
            where: {
                [Op.and]: [
                    {
                        id,
                    },
                    { userId },
                ],
            },
            attributes: ["name", "calories", "fat", "carbs", "protein"],
        });

        return nutrition;
    }

    //implement get all nutrition plans belonging to a user
    async getAllNutritionFromUser(userId) {
        const nutritions = await Nutrition.findAll({
            where: {
                userId,
            },
            attributes: ["name", "calories", "fat", "carbs", "protein"],
        });

        return nutritions;
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
