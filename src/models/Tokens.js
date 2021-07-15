module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define("Tokens", {
        refreshToken: {
            type: DataTypes.TEXT,
        },
    });

    return Tokens;
};
