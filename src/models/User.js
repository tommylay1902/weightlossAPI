const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //sequelize hook to hash password before storing in database
    User.beforeCreate(async (model, options) => {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(model.password, salt);
        model.password = hashedPassword;
    });

    User.associate = (models) => {
        //a user can have many Nutrition plans
        User.hasMany(models.Nutrition, {
            foreignKey: "userId",
            targetKey: "id",
        });
        //a user can have many workout plans
        User.hasMany(models.Workouts, {
            foreignKey: "userId",
            targetKey: "id",
        });

        User.hasMany(models.Exercise, {
            foreignKey: {
                name: "createdBy",
                target: "id",
                allowNull: true,
            },
        });
    };

    return User;
};
