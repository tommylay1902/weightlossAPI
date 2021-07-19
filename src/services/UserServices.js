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
    async getUserByUsername(username, data) {
        const user = await User.findOne({
            where: { username },
            attributes: [...data],
        });

        return user;
    }

    //create user in database
    async createUser(user) {
        try {
            await User.create({ ...user });
        } catch (error) {}
    }

    async deleteUser(id) {
        try {
            await User.destroy({
                where: {
                    id,
                },
            });
        } catch (error) {}
    }
};
