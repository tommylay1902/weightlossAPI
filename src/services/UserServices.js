const { User } = require("../models");

module.exports = class UserService {
    async getUserByUserId(userId) {
        const user = await User.findByPk(userId);
        return user;
    }

    //get user from database
    async getUserByUsername(username) {
        const user = await User.findOne({ where: { username } });
        return user;
    }

    //create user in database
    async createUser(user) {
        const result = await User.create({ ...user });
        return result;
    }

    async deleteUser(user) {}
};
