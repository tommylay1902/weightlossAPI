module.exports = (sequelize, DataTypes) => {
    const Nutrition = sequelize.define("Nutrition", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    Nutrition.associate = (models) => {
        Nutrition.belongsTo(models.User, {
            foreignKey: { name: "userId", allowNull: false },
        });
    };

    return Nutrition;
};
