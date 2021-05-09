const { User } = require("../models");

//get user from database
exports.getUser = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
};

//create user in database
exports.createUser = async (username, password) => {
    const result = await User.create({ username, password });
    return result;
};
