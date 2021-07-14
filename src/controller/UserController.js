const UserService = require("../services/UserServices");
const AuthService = require("../services/AuthServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const us = new UserService();
const as = new AuthService();

module.exports = class UserController {
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

    async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) return res.sendStatus(400);

            const user = await us.getUserByUsername(username);
            if (!user) return res.sendStatus(404);

            const hasMatchingPass = await bcrypt.compare(
                password,
                user.password
            );

            if (!hasMatchingPass) return res.sendStatus(404);
            const userPayload = { username: user.username, id: user.id };

            const guid = uuid.v4();

            //create jwt token when signing in
            const token = jwt.sign(
                userPayload,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.JWT_ACCESS_TIME }
            );

            const refreshToken = jwt.sign(
                { guid: guid },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.JWT_REFRESH_TIME }
            );
            const response = {
                status: "Logged in",
                token: token,
            };

            //save access and refresh tokens in the database
            const tokenPairId = await as.saveTokens(refreshToken, token);

            //save unique user and tokenpairid in database
            await as.saveAuth(user.id, tokenPairId);

            return res.send(response);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    //will delete user and all authentication data from the database
    async deleteUser(req, res) {
        try {
            const { id } = req.userAuth;

            return res.send({ id });
        } catch (e) {}
    }
};
