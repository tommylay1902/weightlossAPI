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

    //a user can have many Nutrition plans
    User.associate = (models) => {
        User.hasMany(models.Nutrition);
    };

    //a user can have many workouts
    User.associate = (models) => {
        User.hasMany(models.Nutrition);
    };

    return User;
};
