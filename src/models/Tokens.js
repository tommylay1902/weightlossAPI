module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define("Tokens", {
        tokenPairId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        accessToken: {
            type: DataTypes.TEXT,
        },
        refreshToken: {
            type: DataTypes.TEXT,
        },
    });

    Tokens.associate = (models) => {
        Tokens.belongsToMany(models.User, {
            through: "Auth",
            foreignKey: "tokenPairId",
            onDelete: "cascade",
            onUpdate: "cascade",
            onCascade: "delete",
            allowNull: "false",
        });
    };

    return Tokens;
};
