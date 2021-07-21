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
    });

    Exercise.associate = (models) => {
        Exercise.belongsToMany(models.Workouts, {
            through: {
                model: "ExerciseToWorkouts",
                unique: false,
            },
            foreignKey: "exerciseId",
            otherKey: "workoutId",
        });

        Exercise.belongsToMany(models.ExerciseData, {
            through: {
                model: "ExerciseToExerciseData",
                unique: false,
            },

            foreignKey: {
                name: "exerciseId",
                target: "id",
            },
        });

        Exercise.belongsTo(models.User, {
            foreignKey: {
                name: "createdBy",
                target: "id",
                allowNull: false,
            },
        });
    };

    return Exercise;
};
