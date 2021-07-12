module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define("Auth", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
        }
    });
    
    return Auth;
};
