const { User } = require("../models");

const sequelize = require('sequelize')

module.exports = class UserService {
    //get user from database
    async getUser(username) {
        const user = await User.findOne({ where: { username } });
        return user;
    }

    //create user in database
    async createUser(user) {
        const result = await User.create({ ...user });
        return result;
    }

    //save refresh token into database
    async saveRefreshToken(user, refreshToken){
        try {
            user.tokenArray = [...user.tokenArray, refreshToken];
            await user.save();
        } catch (error) {
            console.log(error.toString())
        }
    
    }
};
