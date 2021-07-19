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
            exerciseId: {
                type: DataTypes.INTEGER(11),

                references: {
                    model: "Exercises",
                    key: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },
            workoutId: {
                type: DataTypes.INTEGER(11),

                references: {
                    model: "Workouts",
                    key: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            },

            selfGranted: DataTypes.BOOLEAN,
        },
        { timestamps: false }
    );

    return ExerciseToWorkout;
};
