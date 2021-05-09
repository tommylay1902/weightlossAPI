const { User } = require("../models");

//get user from database
exports.getUser = async (username, password) => {
    const user = await User.findOne({ where: { username, password } });
    return user;
};

//create user in database
exports.createUser = async (username, password) => {
    const result = await User.create({ username, password });
    return result;
};
