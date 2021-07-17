const { User } = require("../models");

module.exports = class UserService {
    async getUserByUserId(userId) {
        const user = await User.findOne({
            where: { id: userId },
            attributes: ["username", "firstName", "lastName"],
        });
        return user;
    }

    //get user from database
    async getUserByUsername(username) {
        const user = await User.findOne({
            where: { username },
            attributes: ["username", "firstname", "lastname"],
        });

        return user;
    }

    //create user in database
    async createUser(user) {
        const result = await User.create({ ...user });
        return result;
    }

    async deleteUser(user) {}
};
