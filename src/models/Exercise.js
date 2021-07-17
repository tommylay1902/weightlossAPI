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

    //hide sensitive data from user
    Exercise.afterCreate(async (model, options) => {
        delete model.dataValues.id;
        delete model.dataValues.createdAt;
        delete model.dataValues.updatedAt;
        delete model.dataValues.createdBy;
    });

    Exercise.associate = (models) => {
        Exercise.belongsToMany(models.Workouts, {
            through: "ExerciseToWorkout",
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
