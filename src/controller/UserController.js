const UserService = require("../services/UserServices");

const us = new UserService();

module.exports = class UserController {
    async getUser(req, res) {
        try {
            const userId = req.userAuth.id;
            const user = await us.getUserByUserId(userId);
            return res.send(user);
        } catch (error) {
            return res.send(error.toString());
        }
    }
    async createUser(req, res) {
        try {
            const { username, password, firstName, lastName } = req.body;
            if (!username || !password || !lastName || !firstName)
                return res.sendStatus(400);

            const userExists = await us.getUserByUsername(username);
            if (userExists) return res.sendStatus(409);

            await us.createUser({ ...req.body });
            return res.sendStatus(201);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    //will delete user and all authentication data from the database
    async deleteUser(req, res) {
        try {
            const { id } = req.userAuth;

            return res.send({ id });
        } catch (e) {
            return res.send(e.toString());
        }
    }
};
