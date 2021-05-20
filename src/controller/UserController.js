const UserService = require("../services/UserServices");
const bcrypt = require("bcrypt");

const us = new UserService();

module.exports = class UserController {
    async createUser(req, res) {
        try {
            const { username, password, firstName, lastName } = req.body;
            if (!username || !password || !lastName || !firstName)
                return res.sendStatus(400);

            const userExists = await us.getUser(username);
            if (userExists) return res.sendStatus(409);

            await us.createUser({ ...req.body });
            return res.sendStatus(201);
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    }

    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.sendStatus(400);

            const user = await us.getUser(username);
            if (!user) return res.sendStatus(404);

            const hasMatchingPass = await bcrypt.compare(
                password,
                user.password
            );
            if (!hasMatchingPass) return res.sendStatus(404);

            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(500);
        }
    }
};
