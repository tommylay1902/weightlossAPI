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
    });

    Workout.associate = (models) => {
        Workout.belongsToMany(models.Exercise, {
            through: {
                model: "ExerciseToWorkouts",
                unique: false,
            },
            foreignKey: {
                name: "workoutId",
                target: "id",
            },
        });

        Workout.belongsTo(models.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
    };

    return Workout;
};
