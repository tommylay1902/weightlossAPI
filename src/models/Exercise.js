module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define("Exercise", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        type: {
            type: DataTypes.ENUM,
            values: ["reps", "time"],
        },
    });

    return Exercise;
};
