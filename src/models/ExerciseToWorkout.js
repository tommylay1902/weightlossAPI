module.exports = (sequelize, DataTypes) => {
    const ExerciseToWorkout = sequelize.define(
        "ExerciseToWorkouts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            // selfGranted: DataTypes.BOOLEAN,
        },
        { timestamps: false }
    );

    return ExerciseToWorkout;
};
