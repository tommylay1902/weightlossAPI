module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define("Tokens", {
        refreshToken: {
            type: DataTypes.TEXT,
        },
    });

    Tokens.associate = (models, options) => {
        Tokens.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                targetKey: "id",
            },
            onDelete: "CASCADE",
        });
    };

    return Tokens;
};
