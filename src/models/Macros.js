module.exports = (sequelize, DataTypes) => {
    const Macros = sequelize.define("Macros", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
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

    return Macros;
};
