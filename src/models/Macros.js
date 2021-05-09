module.exports = (sequelize, DataTypes) => {
    const Macros = sequelize.define("Macros", {
        fat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carb: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Macros;
};
