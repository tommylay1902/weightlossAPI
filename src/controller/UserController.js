const { getUser, createUser } = require("../services/UserServices");

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.sendStatus(400);

        const userExists = await getUser(username, password);

        if (userExists) return res.sendStatus(409);

        await createUser(username, password);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.sendStatus(400);

        const user = await getUser(username, password);
        if (!user) return res.sendStatus(404);

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
};
