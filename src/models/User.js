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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //sequelize hook to hash password before storing in database
    User.beforeCreate(async (model, options) => {
        const hashedPassword = await bcrypt.hash(model.password, 12);
        model.password = hashedPassword;
    });

    User.associate = (models) => {
        User.hasMany(models.Macros);
    };

    return User;
};
