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
        User.hasMany(models.Macros);
    };

    User.associate = (models) => {
        User.hasMany(models.Exercise);
    };

    //many to many for sessionid to refreshtokens
    User.associate = (models) => {
        User.belongsToMany(models.Tokens, {
            through: "Auth",
            foreignKey: "userId",
            onDelete: "cascade",
            onUpdate: "cascade",
            onCascade: "delete",
            allowNull: "false",
        });
    };
    return User;
};
