const UserService = require("../services/UserServices");
const TokenService = require("../services/TokenServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const us = new UserService();
const ts = new TokenService();

module.exports = class AuthController {
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

            //create jwt token when signing in
            const token = jwt.sign(
                userPayload,
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.JWT_ACCESS_TIME }
            );

            const refreshToken = jwt.sign(
                userPayload,
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: process.env.JWT_REFRESH_TIME }
            );

            await ts.saveRefreshToken(refreshToken);

            const response = {
                status: "Logged in",
                token,
                refreshToken,
            };

            return res.send(response);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    async refreshAccessToken(req, res) {
        try {
            const refreshToken = req.body.token;

            //no token provided not 403
            if (!refreshToken) return res.send(403);

            const validToken = await ts.isValidRefreshToken(refreshToken);

            //no token in database, not valid
            if (!validToken) return res.sendStatus(403);

            await ts.deleteToken(refreshToken);

            //if refresh token isnt valid anymore, then 403, else create new access token and new refresh token
            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET,
                async function (err, user) {
                    if (!err) {
                        //create new refreshToken
                        const newRefresh = jwt.sign(
                            { username: user.username, id: user.id },
                            process.env.JWT_REFRESH_TOKEN_SECRET,
                            { expiresIn: process.env.JWT_REFRESH_TIME }
                        );

                        await ts.saveRefreshToken(newRefresh);

                        const accessToken = jwt.sign(
                            { username: user.username, id: user.id },
                            process.env.JWT_ACCESS_TOKEN_SECRET,
                            { expiresIn: process.env.JWT_ACCESS_TIME }
                        );

                        return res.send({
                            token: accessToken,
                            refresh: newRefresh,
                        });
                    } else {
                        return res.sendStatus(403);
                    }
                }
            );
        } catch (error) {
            res.send(error.toString());
        }
    }
};
