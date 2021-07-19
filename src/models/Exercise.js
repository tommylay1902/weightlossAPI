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
        description: {
            type: DataTypes.STRING(255),
        },
        type: {
            type: DataTypes.ENUM,
            values: ["reps", "time"],
        },
    });

    Exercise.associate = (models) => {
        Exercise.belongsToMany(models.Workouts, {
            through: "ExerciseToWorkouts",
            foreignKey: {
                name: "exerciseId",
                target: "id",
            },
        });

        Exercise.belongsTo(models.User, {
            foreignKey: {
                name: "createdBy",
                target: "id",
            },
        });
    };

    return Exercise;
};
