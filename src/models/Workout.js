module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define("Workouts", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
    });

    Workout.associate = (models) => {
        Workout.belongsToMany(models.Exercise, {
            through: {
                model: "ExerciseToWorkouts",
                unique: false,
            },
            foreignKey: "workoutId",
            otherKey: "exerciseId",
        });

        Workout.belongsTo(models.User, {
            foreignKey: { name: "userId" },
        });
    };

    return Workout;
};
