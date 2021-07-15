const { Tokens } = require("../models");

module.exports = class TokenService {
    async isValidRefreshToken(incomingToken) {
        const token = await Tokens.findOne({
            where: { refreshToken: incomingToken },
        });

        return token;
    }

    async saveRefreshToken(token) {
        await Tokens.create({ refreshToken: token });
    }

    async deleteToken(token) {
        await Tokens.destroy({
            where: {
                refreshToken: token,
            },
        });
    }
};
