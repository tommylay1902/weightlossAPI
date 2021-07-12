const { Tokens } = require("../models");
const { Auth } = require("../models");
const {User} = require("../models")
module.exports = class AuthService {

    async saveTokens(refreshToken, accessToken){
        const {tokenPairId} =  await Tokens.create({accessToken, refreshToken});
        return tokenPairId;
    }

    async getTokenPairByAccessToken(accessToken){
        const token = await Tokens.findOne({where:{accessToken}})
        return token;
    }

    async getUserIdByTokenPairId(tokenPairId){
        const userId = await Auth.findOne({where:{tokenPairId}});

        return userId;
    }


    async saveAuth(userId, tokenPairId){
        await Auth.create({userId, tokenPairId});
    }
}