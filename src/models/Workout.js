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

    Workout.afterCreate((models, options) => {
        delete models.dataValues.id;
    });

    Workout.associate = (models) => {
        Workout.belongsToMany(models.Exercise, {
            through: "ExerciseToWorkout",
        });
        Workout.belongsTo(models.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
    };

    return Workout;
};
