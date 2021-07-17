const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const bearer = req.headers["authorization"];

    if (bearer) {
        try {
            const token = bearer.replace("Bearer ", "");

            const userAuth = jwt.verify(
                token,
                process.env.JWT_ACCESS_TOKEN_SECRET
            );
            req.userAuth = userAuth;

            next();
        } catch (e) {
            return res.sendStatus(403);
        }
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            error: true,
            message: "No token provided.",
        });
    }
};
