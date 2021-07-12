const jwt = require('jsonwebtoken')
const AuthServices = require('../services/AuthServices')
const UserServices = require('../services/UserServices')

const as = new AuthServices();
const us = new UserServices();

module.exports = async (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization']
    // decode token
    if (token) {
      try {
        const userAuth = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.userAuth = userAuth;

        next();

        ////******************implement Validation here too!!!!********************* */
      } catch (e) {
        // if access token is expired, refresh the token with the refresh token
        if(e instanceof jwt.TokenExpiredError){
          const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization']

          const {tokenPairId} = await as.getTokenPairByAccessToken(token);

          if(!tokenPairId) return res.status(403).send({"message":"Please log in"});

          const {userId} = await as.getUserIdByTokenPairId(tokenPairId);
          

          //placeholder for when impelement more validation
          if(!userId) return res.status(403).send({"message":"Please log in"});
         
          const user = await us.getUserByUserId(userId);

          //placeholder for when impelement more validation
          if(!user) return res.status(403).send({"message":"Please log in"});

          const userPayload = {username: user.username, id: user.id};

          //create jwt token when signing in
          const newToken = jwt.sign(userPayload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_TIME})

          req.userAuth = jwt.verify(newToken, process.env.JWT_ACCESS_TOKEN_SECRET);
          req.headers.authorization = newToken;

          next();
        }
       
      }
      
    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          "error": true,
          "message": 'No token provided.'
      });
    }
  }