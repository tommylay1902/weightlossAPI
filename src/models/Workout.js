const bcrypt = require("bcrypt");

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
        }

    });

    Workout.associate = (models) => {
        Workout.belongsToMany(models.Exercise, {
            through: "ExerciseToWorkout",
        });
    };

    return Workout;
};
