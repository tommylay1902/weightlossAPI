const UserService = require("../services/UserServices");

const us = new UserService();

const userValidation = require("../validation/users");

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
            //validate all users
            await userValidation.validateAsync(req.body);

            const userExists = await us.getUserByUsername(req.body.username, [
                "id",
            ]);

            if (userExists) return res.sendStatus(409);

            await us.createUser({ ...req.body });
            return res.sendStatus(201);
        } catch (error) {
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
