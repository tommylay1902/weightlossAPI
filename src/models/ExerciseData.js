module.exports = (sequelize, DataTypes) => {
    const ExerciseData = sequelize.define("ExerciseData", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM,
            values: ["reps", "time"],
        },
        sets: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        count: {
            type: DataTypes.STRING,
        },
    });
    ExerciseData.associate = (models, options) => {
        ExerciseData.belongsToMany(models.Exercise, {
            through: {
                model: "ExerciseToExerciseData",
                unique: false,
            },

            foreignKey: {
                name: "exerciseDataId",
                target: "id",
            },
        });
    };
    return ExerciseData;
};
