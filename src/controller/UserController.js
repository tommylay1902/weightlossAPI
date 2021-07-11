const UserService = require("../services/UserServices");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
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
            const userPayload = {username: user.username, id: user.id}

            //create jwt token when signing in
            const token = jwt.sign(userPayload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME})
            const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TIME})
            const response = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
            }

            //save refresh token in the database
            await us.saveRefreshToken(user, token);

            return res.send(response);
        } catch (error) {
            return res.send(error.toString());
        }
    }

    
    async refreshAccessToken(req,res){

        const postData = req.body
        


        if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            const user = {
                "username": postData.username,
                "id": postData.id
            }
            const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
            const response = {
                "token": token,
            }
            // update the token in the list
            tokenList[postData.refreshToken].token = token
            res.status(200).json(response);        
        } else {
            res.status(404).send('Invalid request')
        }
    }
};
