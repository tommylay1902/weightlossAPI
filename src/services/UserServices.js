const { User } = require("../models");

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
};
